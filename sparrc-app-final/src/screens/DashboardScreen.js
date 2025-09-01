import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Award, Calendar, Plus, FileText } from 'lucide-react-native'; // Replaced Dumbbell with Calendar

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
    if (!patient) {
        return <View style={styles.screenContainer}><Text>Loading patient data...</Text></View>;
    }

    // Find the next upcoming appointment from the list
    const nextAppointment = patient.appointments && patient.appointments.length > 0 
        ? patient.appointments[0] 
        : null;

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.welcomeTitle}>Welcome, {patient.patient_name || 'User'}!</Text>
            
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Next Appointment</Text>
                {/* --- THIS IS THE FIX --- */}
                {/* Now using the correct properties: 'appointment_date' and 'doctor_name' */}
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
                <StatCard icon={Award} value={`${patient.pain_scale}%`} label="Pain Score" color="#10B981" />
                <StatCard icon={Calendar} value={patient.appointments?.length || 0} label="Appointments" color="#3B82F6" />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={onBookAppointment}>
                <Plus color="#fff" size={20} style={{ marginRight: 10 }}/>
                <Text style={styles.primaryButtonText}>Book New Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={onViewReports}>
                <FileText color="#fff" size={18} style={{ marginRight: 10 }}/>
                <Text style={styles.primaryButtonText}>View Full Report</Text>
            </TouchableOpacity>
        </View>
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
    marginBottom: 10 
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
  cardTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#6B7280' 
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
    marginTop: 20 
  },
  statCard: { 
    flex: 1, 
    borderRadius: 12, 
    padding: 15, 
    alignItems: 'center', 
    marginHorizontal: 5 
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
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;

