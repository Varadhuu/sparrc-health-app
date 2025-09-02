import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SparrcLogo from './SparrcLogo';

// The Header now accepts the patient's name and a function for when the profile is pressed
const Header = ({ patientName, onProfilePress }) => {
    
    // Helper function to get the first initial from a name
    const getInitials = (name) => {
        if (!name) return '?';
        return name.charAt(0).toUpperCase();
    };

    return (
        <View style={styles.header}>
            {/* Logo and Title on the left */}
            <View style={styles.headerLeft}>
                <SparrcLogo size="small" />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>SPARRC</Text>
                    <Text style={styles.headerSubtitle}>Sports & Fitness Medicine Clinic</Text>
                </View>
            </View>
            
            {/* --- MODIFIED: Replaced the menu icon with a clickable profile avatar --- */}
            <TouchableOpacity onPress={onProfilePress} style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>{getInitials(patientName)}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        backgroundColor: '#fff', 
        borderBottomWidth: 1, 
        borderBottomColor: '#E5E7EB' 
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTextContainer: {
        marginLeft: 10,
    },
    headerTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#1F2937' 
    },
    headerSubtitle: { 
        fontSize: 12, 
        color: '#6B7280' 
    },
    // --- NEW STYLES for the profile avatar ---
    profileAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20, // Makes it a perfect circle
        backgroundColor: '#6D28D9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileAvatarText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Header;

