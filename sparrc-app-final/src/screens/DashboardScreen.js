import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Award, Dumbbell, Plus } from 'lucide-react-native';

const StatCard = ({ icon: Icon, value, label, color }) => (
    <View style={[styles.statCard, { backgroundColor: color + '20' }]}>
        <Icon color={color} size={28} />
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const DashboardScreen = ({ patient, onBookAppointmentPress }) => {
    const nextAppointment = patient?.appointments?.[0];

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.welcomeTitle}>Welcome, {patient.patient_name || 'Patient'}!</Text>
            
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Next Appointment</Text>
                {nextAppointment ? (
                    <>
                        <Text style={styles.appointmentTime}>{nextAppointment.date} at {nextAppointment.time}</Text>
                        <Text style={styles.appointmentDoctor}>with {nextAppointment.doctor}</Text>
                    </>
                ) : (
                    <Text style={styles.appointmentDoctor}>No upcoming appointments.</Text>
                )}
            </View>

            <View style={styles.statsGrid}>
                <StatCard icon={Award} value={`${patient.pain_scale * 10}%`} label="Recovery Score" color="#10B981" />
                <StatCard icon={Dumbbell} value={patient?.appointments?.length || 0} label="Appointments" color="#3B82F6" />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={onBookAppointmentPress}>
                <Plus color="#fff" size={22} />
                <Text style={styles.addButtonText}>Book New Appointment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: { padding: 20 },
    welcomeTitle: { fontSize: 26, fontWeight: 'bold' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginTop: 15, elevation: 3 },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#6B7280' },
    appointmentTime: { fontSize: 20, fontWeight: 'bold', marginVertical: 5 },
    appointmentDoctor: { fontSize: 14, color: '#4B5563' },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    statCard: { flex: 1, borderRadius: 12, padding: 15, alignItems: 'center', marginHorizontal: 5 },
    statValue: { fontSize: 22, fontWeight: 'bold', marginTop: 8 },
    statLabel: { fontSize: 12, color: '#4B5563', marginTop: 2 },
    addButton: { marginTop: 25, backgroundColor: '#6D28D9', borderRadius: 12, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 8 },
    addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});

export default DashboardScreen;

