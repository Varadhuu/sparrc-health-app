import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Calendar, X } from 'lucide-react-native';
import { API_BASE_URL } from '../api'; // Import the base URL from your api.js file

const AddAppointmentModal = ({ isVisible, onClose, onAddAppointment, patientId, doctorId }) => {
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to handle loading indicator

    const handleAddAppointment = async () => {
        if (!reason.trim()) {
            Alert.alert("Missing Information", "Please enter a reason for the appointment.");
            return;
        }

        setIsLoading(true); // Show loading indicator

        try {
            const response = await fetch(`${API_BASE_URL}/api/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientId: patientId,
                    doctorId: doctorId,
                    reason: reason,
                    date: new Date().toISOString(),
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Your appointment has been booked.");
                setReason('');
                onAddAppointment();
            } else {
                throw new Error(result.message || 'Failed to book appointment.');
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
            Alert.alert("Error", "Could not book the appointment. Please try again.");
        } finally {
            setIsLoading(false); // Hide loading indicator
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>New Appointment</Text>
                        <TouchableOpacity onPress={onClose}><X color="#6B7280" size={24} /></TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Reason for Appointment</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Follow-up, Body Pain"
                        value={reason}
                        onChangeText={setReason}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddAppointment} disabled={isLoading}>
                        {isLoading ? (
                            // --- THIS IS THE FIX ---
                            // Corrected from PlatformActivityIndicator to ActivityIndicator
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Calendar color="#fff" size={18} />
                                <Text style={styles.addButtonText}>Confirm Booking</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalView: { width: '90%', backgroundColor: 'white', borderRadius: 20, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 20, fontWeight: 'bold' },
    label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 },
    input: { height: 50, borderColor: '#D1D5DB', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, fontSize: 16, marginBottom: 20 },
    addButton: { backgroundColor: '#6D28D9', borderRadius: 12, paddingVertical: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minHeight: 50 },
    addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});

export default AddAppointmentModal;

