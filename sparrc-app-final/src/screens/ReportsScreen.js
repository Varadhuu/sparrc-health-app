import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, User, Calendar, Phone, Heart, Stethoscope, Pill, Download } from 'lucide-react-native';
import DownloadReportModal from '../components/DownloadReportModal'; // Assuming the modal is in components

// Reusable component for each detail row to keep the code clean
const DetailRow = ({ icon: Icon, label, value }) => (
    <View style={styles.detailRow}>
        <Icon color="#4B5563" size={18} style={styles.detailIcon} />
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.detailValue}>{value || 'N/A'}</Text>
    </View>
);

// Reusable component for section headers
const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
);


const ReportsScreen = ({ patient }) => {
    const [modalVisible, setModalVisible] = useState(false);

    // Formatting the DOB for display
    const formattedDOB = patient.dob ? new Date(patient.dob).toLocaleDateString('en-GB') : 'N/A';

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Patient Report</Text>
            
            {/* --- MODIFIED: A single card now holds all the information --- */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <FileText color="#6D28D9" size={24} />
                    <Text style={styles.cardHeaderText}>Comprehensive Health Summary</Text>
                </View>

                {/* Personal Information Section */}
                <SectionHeader title="Personal Information" />
                <DetailRow icon={User} label="Patient Name" value={patient.patient_name} />
                <DetailRow icon={Calendar} label="Date of Birth" value={formattedDOB} />
                <DetailRow icon={User} label="Gender" value={patient.gender} />
                <DetailRow icon={Phone} label="Contact" value={patient.mobile_number} />

                {/* Complaint Details Section */}
                <SectionHeader title="Complaint Details" />
                <DetailRow icon={Heart} label="Main Complaint" value={patient.main_complaints} />
                <DetailRow icon={Stethoscope} label="Complaint Duration" value={patient.complaint_duration} />
                <DetailRow icon={Heart} label="Pain Scale (1-10)" value={patient.pain_scale} />
                
                {/* Consultation Details Section */}
                <SectionHeader title="Consultation Details" />
                <DetailRow icon={Stethoscope} label="Consulted By" value={patient.doctor_name} />
                <DetailRow icon={Stethoscope} label="Department" value={patient.specialization} />
                <DetailRow icon={Pill} label="Current Medication" value={patient.current_medication} />

                {/* --- MODIFIED: Download button is now at the bottom of the single card --- */}
                <TouchableOpacity style={styles.downloadButton} onPress={() => setModalVisible(true)}>
                    <Download color="#fff" size={18} style={{marginRight: 10}}/>
                    <Text style={styles.downloadButtonText}>Download Full Report</Text>
                </TouchableOpacity>
            </View>

            <DownloadReportModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                patient={patient}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: { 
        padding: 20,
    },
    screenTitle: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        color: '#111827' 
    },
    card: { 
        backgroundColor: '#fff', 
        borderRadius: 12, 
        padding: 20, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.05, 
        shadowRadius: 4, 
        elevation: 3 
    },
    cardHeader: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#F3F4F6', 
        paddingBottom: 15, 
        marginBottom: 10 
    },
    cardHeaderText: { 
        fontSize: 18, 
        fontWeight: '600', 
        color: '#1F2937', 
        marginLeft: 10 
    },
    sectionHeader: {
        marginTop: 15,
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151',
    },
    detailRow: { 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        marginVertical: 8 
    },
    detailIcon: { 
        marginRight: 10, 
        marginTop: 3 
    },
    detailLabel: { 
        fontSize: 15, 
        fontWeight: '500', 
        color: '#6B7280', 
        width: 140 // Fixed width for alignment
    },
    detailValue: { 
        fontSize: 15, 
        color: '#111827', 
        flex: 1 // Takes up remaining space
    },
    downloadButton: { 
        flexDirection: 'row',
        backgroundColor: '#6D28D9', 
        borderRadius: 12, 
        paddingVertical: 15, 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20 
    },
    downloadButtonText: { 
        color: '#fff', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
});

export default ReportsScreen;

