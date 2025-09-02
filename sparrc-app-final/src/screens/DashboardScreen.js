import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Award, Calendar, Plus, FileText, Lightbulb } from 'lucide-react-native';

// Helper function to format the date and time
const formatDateTime = (isoString) => {
    if (!isoString) return 'No upcoming appointments.';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
};

const StatCard = ({ icon: Icon, value, label, color }) => (
  <View style={[styles.statCard, { backgroundColor: color + '20' }]}>
    <Icon color={color} size={28} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const DashboardScreen = ({ patient, onBookAppointment, onViewReports }) => {
    if (!patient || !patient.appointments) {
        return <View style={styles.screenContainer}><Text>Loading patient data...</Text></View>;
    }

    // Find the soonest upcoming appointment
    const nextAppointment = patient.appointments
        .filter(a => new Date(a.appointment_date) >= new Date())
        .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))[0];

    return (
        <ScrollView contentContainerStyle={styles.screenContainer}>
            <Text style={styles.welcomeTitle}>Welcome, {patient.patient_name || 'User'}!</Text>
            
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Next Appointment</Text>
                {nextAppointment ? (
                    <>
                        <Text style={styles.appointmentTime}>{formatDateTime(nextAppointment.appointment_date)}</Text>
                        <Text style={styles.appointmentDoctor}>with {nextAppointment.doctor_name}</Text>
                    </>
                ) : (
                    <Text style={styles.appointmentDoctor}>No upcoming appointments.</Text>
                )}
            </View>

            <View style={styles.statsGrid}>
                {/* --- MODIFIED: Color changed from red to green --- */}
                <StatCard icon={Award} value={`${patient.pain_scale}/10`} label="Pain Score" color="#10B981" />
                <StatCard icon={Calendar} value={patient.appointments.length} label="Appointments" color="#3B82F6" />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={onBookAppointment}>
                <Plus color="#fff" size={20} style={{ marginRight: 10 }}/>
                <Text style={styles.primaryButtonText}>Book New Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.primaryButton, { marginTop: 10 }]} onPress={onViewReports}>
                <FileText color="#fff" size={18} style={{ marginRight: 10 }}/>
                <Text style={styles.primaryButtonText}>View Full Report</Text>
            </TouchableOpacity>
            
            <Text style={styles.sectionTitle}>Health Tip of the Day</Text>
            <View style={styles.tipCard}>
                <Lightbulb color="#92400E" size={24} style={styles.tipIcon} />
                <Text style={styles.tipText}>Remember to stay hydrated! Drinking enough water is crucial for muscle recovery and overall joint health.</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  screenContainer: { 
    padding: 20,
  },
  welcomeTitle: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#111827', 
    marginBottom: 20
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 3 
  },
  appointmentTime: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginVertical: 5 
  },
  appointmentDoctor: { 
    fontSize: 14, 
    color: '#4B5563' 
  },
  statsGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20,
  },
  statCard: { 
    flex: 1,
    borderRadius: 12, 
    padding: 15, 
    alignItems: 'center', 
    marginHorizontal: 5,
  },
  statValue: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginTop: 8 
  },
  statLabel: { 
    fontSize: 12, 
    color: '#4B5563', 
    marginTop: 2 
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#6D28D9',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 25,
    marginBottom: 10,
  },
  tipCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    marginRight: 15,
  },
  tipText: {
    color: '#92400E',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  }
});

export default DashboardScreen;

