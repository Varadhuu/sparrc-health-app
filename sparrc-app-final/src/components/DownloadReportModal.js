import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import { X, File, Share2 } from 'lucide-react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const DownloadReportModal = ({ isVisible, onClose, patient }) => {

    // --- PDF Generation and Sharing Logic ---
    const generateAndSharePdf = async () => {
        // Create an HTML string that will be converted into a PDF
        const htmlContent = `
            <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h1 style="color: #6D28D9;">SPARRC Patient Report</h1>
                    <h2>${patient.patient_name}</h2>
                    <hr />
                    <h3>Personal Information</h3>
                    <p><strong>Date of Birth:</strong> ${new Date(patient.dob).toLocaleDateString('en-GB')}</p>
                    <p><strong>Gender:</strong> ${patient.gender}</p>
                    <p><strong>Contact:</strong> ${patient.mobile_number}</p>
                    <hr />
                    <h3>Complaint Details</h3>
                    <p><strong>Main Complaint:</strong> ${patient.main_complaints}</p>
                    <p><strong>Duration:</strong> ${patient.complaint_duration}</p>
                    <p><strong>Pain Scale (1-10):</strong> ${patient.pain_scale}</p>
                    <hr />
                    <h3>Consultation Details</h3>
                    <p><strong>Consulted By:</strong> ${patient.doctor_name}</p>
                    <p><strong>Department:</strong> ${patient.specialization}</p>
                    <p><strong>Current Medication:</strong> ${patient.current_medication}</p>
                </body>
            </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            console.log('File has been saved to:', uri);
            await Sharing.shareAsync(uri, { dialogTitle: 'Share or save your report' });
        } catch (error) {
            console.error('Failed to generate or share PDF:', error);
            alert('Error', 'Could not generate or share the report.');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackdrop}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Download Options</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X color="#4B5563" size={24} />
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={styles.optionButton} onPress={generateAndSharePdf}>
                        <File color="#6D28D9" size={22} style={styles.optionIcon} />
                        <Text style={styles.optionText}>Generate and Share as PDF</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end', // Aligns modal to the bottom
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    closeButton: {
        padding: 5,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    optionIcon: {
        marginRight: 15,
    },
    optionText: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
    },
});

export default DownloadReportModal;

