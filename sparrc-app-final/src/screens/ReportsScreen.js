import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, Heart, Stethoscope, Pill } from 'lucide-react-native';

const DetailRow = ({ icon: Icon, label, value }) => (
    <View style={styles.detailRow}>
        <Icon color="#4B5563" size={18} style={styles.detailIcon} />
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const ReportsScreen = ({ patient }) => {
    // Formatting the DOB for display
    const formattedDOB = patient.dob ? new Date(patient.dob).toLocaleDateString('en-GB') : 'N/A';

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Medical Report</Text>
            
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <FileText color="#6D28D9" size={24} />
                    <Text style={styles.cardHeaderText}>Patient Overview</Text>
                </View>

                <DetailRow icon={Heart} label="Patient Name" value={patient.patient_name || 'Vijay Kumar'} />
                <DetailRow icon={Stethoscope} label="Main Complaint" value={patient.main_complaints} />
                <DetailRow icon={Stethoscope} label="Complaint Duration" value={patient.complaint_duration} />
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Stethoscope color="#6D28D9" size={24} />
                    <Text style={styles.cardHeaderText}>Consultation Details</Text>
                </View>
                <DetailRow icon={Stethoscope} label="Consulted By" value={patient.doctor_name || 'Dr. Tamil Selvan'} />
                <DetailRow icon={Stethoscope} label="Department" value={patient.specialization} />
                <DetailRow icon={Pill} label="Current Medication" value={patient.current_medication || 'None'} />
            </View>

            <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadButtonText}>Download Full Report (PDF)</Text>
            </TouchableOpacity>
        </View>
    );
};
// 
const styles = StyleSheet.create({
    screenContainer: { padding: 20 },
    screenTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#111827' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 3 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 10, marginBottom: 15 },
    cardHeaderText: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginLeft: 10 },
    detailRow: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 8 },
    detailIcon: { marginRight: 10, marginTop: 2 },
    detailLabel: { fontSize: 15, fontWeight: '500', color: '#6B7280', width: 120 },
    detailValue: { fontSize: 15, color: '#111827', flex: 1 },
    downloadButton: { backgroundColor: '#6D28D9', borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
    downloadButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ReportsScreen;
