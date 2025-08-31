    import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Calendar, X } from 'lucide-react-native';

const AddAppointmentModal = ({ isVisible, onClose, onAddAppointment }) => {
    const [specialty, setSpecialty] = useState('');
    
    const handleAdd = () => {
        if (!specialty.trim()) {
            Alert.alert("Missing Information", "Please enter a reason for the appointment.");
            return;
        }
        // Mock data for simplicity. A real app would use date/time pickers.
        const newAppointment = {
            specialty: specialty,
            doctorId: 'D002',
            date: '2025-09-15',
            time: '14:00:00',
        };
        onAddAppointment(newAppointment);
        setSpecialty('');
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
                        placeholder="e.g., Follow-up, Physical Therapy"
                        value={specialty}
                        onChangeText={setSpecialty}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                        <Calendar color="#fff" size={18} />
                        <Text style={styles.addButtonText}>Confirm Booking</Text>
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
    addButton: { backgroundColor: '#6D28D9', borderRadius: 12, paddingVertical: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});

export default AddAppointmentModal;

