import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { Award, Calendar, Plus, FileText, Lightbulb, Activity, Heart, TrendingUp, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Helper function to format the date and time
const formatDateTime = (isoString) => {
    if (!isoString) return 'No upcoming appointments.';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
};

const StatCard = ({ icon: Icon, value, label, color }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shadowAnim = useRef(new Animated.Value(3)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(shadowAnim, {
        toValue: 8,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(shadowAnim, {
        toValue: 3,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View 
        style={[
          styles.statCard, 
          {
            transform: [{ scale: scaleAnim }],
            elevation: shadowAnim,
            shadowOpacity: shadowAnim.interpolate({
              inputRange: [3, 8],
              outputRange: [0.05, 0.15],
            }),
          }
        ]}
      >
        <View style={[styles.statIconContainer, { backgroundColor: color }]}>
          <Icon color="#fff" size={24} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const QuickActionCard = ({ icon: Icon, title, subtitle, onPress, color }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(translateXAnim, {
        toValue: 5,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity 
      style={[styles.quickActionCard, { borderLeftColor: color }]} 
      onPress={onPress}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View 
        style={[
          styles.quickActionContent,
          {
            transform: [
              { scale: scaleAnim },
              { translateX: translateXAnim }
            ],
          }
        ]}
      >
        <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
          <Icon color={color} size={20} />
        </View>
        <View style={styles.quickActionText}>
          <Text style={styles.quickActionTitle}>{title}</Text>
          <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const AppointmentCard = ({ nextAppointment, onBookAppointment }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (nextAppointment) {
      // Subtle pulse animation for upcoming appointments
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [nextAppointment]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View 
        style={[
          styles.appointmentCard,
          {
            transform: [
              { scale: Animated.multiply(pulseAnim, scaleAnim) }
            ],
          }
        ]}
      >
        <View style={styles.appointmentHeader}>
          <View style={styles.appointmentIconContainer}>
            <Clock color="#6D28D9" size={20} />
          </View>
          <Text style={styles.appointmentCardTitle}>Next Appointment</Text>
        </View>
        {nextAppointment ? (
          <View style={styles.appointmentDetails}>
            <View style={styles.appointmentMainInfo}>
              <Text style={styles.appointmentTime}>{formatDateTime(nextAppointment.appointment_date)}</Text>
              <Text style={styles.appointmentDoctor}>with Dr. {nextAppointment.doctor_name}</Text>
            </View>
            <View style={styles.appointmentMetaInfo}>
              <View style={styles.appointmentBadge}>
                <Text style={styles.appointmentBadgeText}>{nextAppointment.consultation_type}</Text>
              </View>
              <Text style={styles.appointmentLocation}>{nextAppointment.branch}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.noAppointmentContainer}>
            <Text style={styles.noAppointmentText}>No upcoming appointments</Text>
            <TouchableOpacity style={styles.scheduleButton} onPress={onBookAppointment}>
              <Text style={styles.scheduleButtonText}>Schedule Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};


const DashboardScreen = ({ patient, onBookAppointment, onViewReports }) => {
    if (!patient || !patient.appointments) {
        return <View style={styles.screenContainer}><Text>Loading patient data...</Text></View>;
    }

    // Find the soonest upcoming appointment
    const nextAppointment = patient.appointments
        .filter(a => new Date(a.appointment_date) >= new Date())
        .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))[0];

    // Get pain level color
    const getPainColor = (painLevel) => {
        if (painLevel <= 3) return '#10B981'; // Green
        if (painLevel <= 6) return '#F59E0B'; // Yellow
        return '#EF4444'; // Red
    };

    const painColor = getPainColor(patient.pain_scale);

    return (
        <ScrollView 
            contentContainerStyle={styles.screenContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* Welcome Header */}
            <View style={styles.welcomeHeader}>
                <Text style={styles.welcomeTitle}>Welcome back,</Text>
                <Text style={styles.welcomeName}>{patient.patient_name?.split(' ')[0] || 'User'}! 👋</Text>
                <Text style={styles.welcomeSubtitle}>How are you feeling today?</Text>
            </View>
            
            {/* Next Appointment Card */}
            <AppointmentCard 
                nextAppointment={nextAppointment} 
                onBookAppointment={onBookAppointment} 
            />

            {/* Health Stats Grid */}
            <View style={styles.statsGrid}>
                <StatCard 
                    icon={Heart} 
                    value={`${patient.pain_scale}/10`} 
                    label="Pain Level" 
                    color={painColor}
                />
                <StatCard 
                    icon={Calendar} 
                    value={patient.appointments.length} 
                    label="Total Visits" 
                    color="#3B82F6"
                />
                <StatCard 
                    icon={Activity} 
                    value="85%" 
                    label="Recovery" 
                    color="#8B5CF6"
                />
                <StatCard 
                    icon={TrendingUp} 
                    value="+12%" 
                    label="Progress" 
                    color="#10B981"
                />
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActionsContainer}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <QuickActionCard
                    icon={Plus}
                    title="Book Appointment"
                    subtitle="Schedule your next visit"
                    onPress={onBookAppointment}
                    color="#6D28D9"
                />
                <QuickActionCard
                    icon={FileText}
                    title="View Reports"
                    subtitle="Access your medical records"
                    onPress={onViewReports}
                    color="#3B82F6"
                />
            </View>
            
            {/* Health Tip */}
            <View style={styles.tipContainer}>
                <Text style={styles.sectionTitle}>Daily Health Tip</Text>
                <View style={styles.tipCard}>
                    <View style={styles.tipIconContainer}>
                        <Lightbulb color="#F59E0B" size={24} />
                    </View>
                    <View style={styles.tipContent}>
                        <Text style={styles.tipTitle}>Stay Hydrated</Text>
                        <Text style={styles.tipText}>Drinking 8-10 glasses of water daily helps with muscle recovery and joint health. Keep a water bottle nearby!</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: { 
        padding: 20,
        paddingBottom: 100,
    },
    welcomeHeader: {
        marginBottom: 25,
    },
    welcomeTitle: { 
        fontSize: 16, 
        color: '#6B7280',
        fontWeight: '500',
    },
    welcomeName: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#111827', 
        marginTop: 2,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#9CA3AF',
        marginTop: 4,
    },
    appointmentCard: { 
        backgroundColor: '#fff', 
        borderRadius: 20, 
        padding: 20, 
        marginBottom: 25,
        shadowColor: '#6D28D9', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 12, 
        elevation: 8,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    appointmentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    appointmentIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EDE9FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    appointmentCardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    appointmentDetails: {
        marginTop: 8,
    },
    appointmentMainInfo: {
        marginBottom: 12,
    },
    appointmentTime: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#111827', 
        marginBottom: 6,
    },
    appointmentDoctor: { 
        fontSize: 15, 
        color: '#6B7280',
        fontWeight: '500',
    },
    appointmentMetaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    appointmentBadge: {
        backgroundColor: '#EDE9FE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    appointmentBadgeText: {
        fontSize: 12,
        color: '#6D28D9',
        fontWeight: '600',
    },
    appointmentLocation: {
        fontSize: 13,
        color: '#9CA3AF',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
        marginLeft: 12,
    },
    noAppointmentContainer: {
        marginTop: 8,
        alignItems: 'flex-start',
    },
    noAppointmentText: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    scheduleButton: {
        backgroundColor: '#6D28D9',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    scheduleButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    statsGrid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    statCard: { 
        width: (width - 60) / 2,
        backgroundColor: '#fff',
        borderRadius: 16, 
        padding: 16, 
        alignItems: 'center', 
        marginBottom: 15,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.05, 
        shadowRadius: 8, 
        elevation: 3,
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statValue: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#111827',
        marginBottom: 2,
    },
    statLabel: { 
        fontSize: 12, 
        color: '#6B7280', 
        fontWeight: '500',
        textAlign: 'center',
    },
    quickActionsContainer: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 15,
    },
    quickActionCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.05, 
        shadowRadius: 8, 
        elevation: 3,
    },
    quickActionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    quickActionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    quickActionText: {
        flex: 1,
    },
    quickActionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
    },
    quickActionSubtitle: {
        fontSize: 13,
        color: '#6B7280',
    },
    tipContainer: {
        marginBottom: 20,
    },
    tipCard: {
        backgroundColor: '#FFFBEB',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#FEF3C7',
    },
    tipIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FEF3C7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    tipContent: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#92400E',
        marginBottom: 4,
    },
    tipText: {
        color: '#92400E',
        fontSize: 13,
        lineHeight: 18,
        opacity: 0.8,
    },
});

export default DashboardScreen;