import React, { useState, useEffect } from 'react';
// --- THIS IS THE FIX: Added SafeAreaView to the import list ---
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { User, Phone, Mail, Save, ArrowLeft } from 'lucide-react-native';

// Reusable component for input fields to keep the code clean
const ProfileInput = ({ icon: Icon, label, value, onChangeText, keyboardType = 'default' }) => (
    <View style={styles.inputContainer}>
        <Icon color="#6B7280" size={20} style={styles.inputIcon} />
        <View style={styles.inputField}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholderTextColor="#9CA3AF"
            />
        </View>
    </View>
);

const ProfileScreen = ({ patient, onSave, onBack, isLoading }) => {
    // State to hold the editable patient data
    const [editablePatient, setEditablePatient] = useState(patient);

    useEffect(() => {
        setEditablePatient(patient);
    }, [patient]);

    const handleSave = () => {
        // Basic validation
        if (!editablePatient.patient_name || !editablePatient.mobile_number) {
            Alert.alert("Validation Error", "Patient name and mobile number cannot be empty.");
            return;
        }
        onSave(editablePatient);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <ArrowLeft color="#1F2937" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <ProfileInput
                    icon={User}
                    label="Full Name"
                    value={editablePatient.patient_name}
                    onChangeText={(text) => setEditablePatient({ ...editablePatient, patient_name: text })}
                />
                <ProfileInput
                    icon={Mail}
                    label="Email Address"
                    value={editablePatient.email}
                    onChangeText={(text) => setEditablePatient({ ...editablePatient, email: text })}
                    keyboardType="email-address"
                />
                <ProfileInput
                    icon={Phone}
                    label="Mobile Number"
                    value={editablePatient.mobile_number}
                    onChangeText={(text) => setEditablePatient({ ...editablePatient, mobile_number: text })}
                    keyboardType="phone-pad"
                />
                <ProfileInput
                    icon={User}
                    label="Gender"
                    value={editablePatient.gender}
                    onChangeText={(text) => setEditablePatient({ ...editablePatient, gender: text })}
                />
                 <ProfileInput
                    icon={User}
                    label="Occupation"
                    value={editablePatient.occupation}
                    onChangeText={(text) => setEditablePatient({ ...editablePatient, occupation: text })}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Save color="#fff" size={18} style={{ marginRight: 10 }} />
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    container: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#1F2937',
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    inputIcon: {
        marginRight: 15,
    },
    inputField: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 2,
    },
    input: {
        fontSize: 16,
        color: '#111827',
        paddingVertical: 0,
    },
    saveButton: {
        flexDirection: 'row',
        backgroundColor: '#6D28D9',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;

