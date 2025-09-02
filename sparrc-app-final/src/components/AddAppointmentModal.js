import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { Calendar, X, Users, Globe } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_BASE_URL } from '../api';

const AddAppointmentModal = ({ isVisible, onClose, onAddAppointment, patientId, doctorId }) => {
    const [reason, setReason] = useState('');
    const [consultationType, setConsultationType] = useState('In Person');
    const [branch, setBranch] = useState('');
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    // --- THIS IS THE FINAL FIX ---
    // State to manage the picker's visibility and mode ('date' or 'time')
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date');

    // This new function handles the two-step date and time selection process
    const onPickerChange = (event, selectedDate) => {
        // Always hide the picker after the user interacts with it
        setShowPicker(false);

        // 'set' means the user confirmed a selection
        if (event.type === 'set' && selectedDate) {
            const currentDate = selectedDate;
            setDate(currentDate);

            // If the user just finished picking a DATE, now show the TIME picker
            if (pickerMode === 'date') {
                // Use a short delay to ensure the date picker has fully closed
                // before we open the time picker, preventing the crash.
                setTimeout(() => {
                    setPickerMode('time');
                    setShowPicker(true);
                }, 500);
            }
        }
    };

    // This function starts the process by showing the date picker first
    const showDatePicker = () => {
        setPickerMode('date');
        setShowPicker(true);
    };


    const handleAddAppointment = async () => {
        if (!reason.trim() || !branch.trim()) {
            Alert.alert("Missing Information", "Please fill in all fields.");
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientId,
                    doctorId,
                    reason,
                    date: date.toISOString(),
                    consultationType,
                    branch,
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to book appointment.');
            }
            
            Alert.alert("Success", "Your appointment request has been sent.");
            setReason('');
            setBranch('');
            onAddAppointment(); 
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>Book Appointment</Text>
                        <TouchableOpacity onPress={onClose}><X color="#6B7280" size={24} /></TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Consultation Type</Text>
                    <View style={styles.typeSelector}>
                        <TouchableOpacity 
                            style={[styles.typeButton, consultationType === 'In Person' && styles.typeButtonActive]} 
                            onPress={() => setConsultationType('In Person')}>
                            <Users color={consultationType === 'In Person' ? '#6D28D9' : '#6B7280'} size={18}/>
                            <Text style={[styles.typeButtonText, consultationType === 'In Person' && styles.typeButtonTextActive]}>In Person</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.typeButton, consultationType === 'Online' && styles.typeButtonActive]} 
                            onPress={() => setConsultationType('Online')}>
                            <Globe color={consultationType === 'Online' ? '#6D28D9' : '#6B7280'} size={18}/>
                            <Text style={[styles.typeButtonText, consultationType === 'Online' && styles.typeButtonTextActive]}>Online</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>Branch</Text>
                    <TextInput style={styles.input} placeholder="e.g., Anna Nagar, Chennai" value={branch} onChangeText={setBranch} />

                    <Text style={styles.label}>Date & Time</Text>
                    {/* The button now calls the new function to start the date picking process */}
                    <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
                        <Calendar color="#4B5563" size={18} />
                        <Text style={styles.datePickerText}>{date.toLocaleString()}</Text>
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode={pickerMode} // The mode is now dynamic ('date' or 'time')
                            is24Hour={false}
                            display="default"
                            onChange={onPickerChange}
                        />
                    )}

                    <Text style={styles.label}>Reason for Appointment</Text>
                    <TextInput style={[styles.input, {height: 80, textAlignVertical: 'top'}]} placeholder="e.g., Follow-up, Body Pain" value={reason} onChangeText={setReason} multiline/>
                    
                    <TouchableOpacity style={styles.addButton} onPress={handleAddAppointment} disabled={isLoading}>
                        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.addButtonText}>Request Appointment</Text>}
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
    label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8, marginTop: 10 },
    input: { height: 50, borderColor: '#D1D5DB', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, fontSize: 16, backgroundColor: '#F9FAFB' },
    addButton: { backgroundColor: '#6D28D9', borderRadius: 12, paddingVertical: 15, justifyContent: 'center', alignItems: 'center', minHeight: 50, marginTop: 20 },
    addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    typeSelector: { flexDirection: 'row', marginBottom: 10, gap: 10 },
    typeButton: { flexDirection: 'row', flex: 1, padding: 12, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    typeButtonActive: { borderColor: '#6D28D9', backgroundColor: '#EDE9FE' },
    typeButtonText: { color: '#6B7280', marginLeft: 8, fontWeight: '500' },
    typeButtonTextActive: { color: '#6D28D9' },
    datePickerButton: { flexDirection: 'row', height: 50, borderColor: '#D1D5DB', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, alignItems: 'center', backgroundColor: '#F9FAFB' },
    datePickerText: { fontSize: 16, marginLeft: 10, color: '#1F2937' },
});

export default AddAppointmentModal;

