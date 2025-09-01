import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Helper function to format the date and time into a more readable format
const formatDateTime = (isoString) => {
    if (!isoString) return 'No date provided';
    const date = new Date(isoString);
    // Example output: "Tuesday, September 2, 2025, 11:00 AM"
    return date.toLocaleString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
};

const AppointmentsScreen = ({ appointments = [] }) => {
    
    // This component renders a single appointment item in the list
    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <View style={styles.detailsContainer}>
                {/* --- THIS IS THE FIX --- */}
                {/* Now using the correct property names: 'reason' and 'doctor_name' */}
                <Text style={styles.listItemTitle}>{item.reason}</Text>
                <Text style={styles.listItemSubtitle}>with {item.doctor_name}</Text>
                <Text style={styles.listItemTime}>{formatDateTime(item.appointment_date)}</Text>
            </View>
            <Text 
                style={[
                    styles.statusBadge, 
                    // Style the badge differently based on the appointment status
                    {
                        backgroundColor: item.status.toLowerCase() === 'confirmed' ? '#D1FAE5' : '#FEF3C7', 
                        color: item.status.toLowerCase() === 'confirmed' ? '#065F46' : '#92400E'
                    }
                ]}
            >
                {item.status}
            </Text>
        </View>
    );

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Appointments</Text>
            {/* Use a FlatList for better performance with lists */}
            {appointments && appointments.length > 0 ? (
                <FlatList
                    data={appointments}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            ) : (
                <Text style={styles.noAppointmentsText}>You have no scheduled appointments.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: { 
        padding: 20,
        flex: 1, // Ensures the container fills the screen
    },
    screenTitle: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20,
        color: '#111827',
    },
    listItem: { 
        backgroundColor: '#fff', 
        borderRadius: 12, 
        padding: 15, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    detailsContainer: {
        flex: 1, // Allows text to wrap if it gets too long
    },
    listItemTitle: { 
        fontSize: 16, 
        fontWeight: '600', 
        color: '#1F2937' 
    },
    listItemSubtitle: { 
        fontSize: 14, 
        color: '#6B7280', 
        marginTop: 2 
    },
    listItemTime: { 
        fontSize: 14, 
        color: '#6D28D9', 
        marginTop: 4, 
        fontWeight: '500' 
    },
    statusBadge: { 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        borderRadius: 12, 
        fontSize: 12, 
        fontWeight: 'bold',
        overflow: 'hidden', // Ensures the border radius is applied correctly
        marginLeft: 10, // Adds space between text and the badge
        textTransform: 'capitalize',
    },
    noAppointmentsText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#6B7280',
    }
});

export default AppointmentsScreen;

