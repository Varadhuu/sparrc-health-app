import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Text, Alert } from 'react-native';

import AddAppointmentModal from './src/components/AddAppointmentModal';
import { fetchPatientData } from './src/api'; 
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';
import SideMenu from './src/components/SideMenu';
import SplashScreen from './src/components/SplashScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import ReportsScreen from './src/screens/ReportsScreen';

export default function App() {
    const [appStatus, setAppStatus] = useState('loading');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showMenu, setShowMenu] = useState(false);
    const [patientData, setPatientData] = useState(null); 
    const [isModalVisible, setIsModalVisible] = useState(false);

    const loadData = () => {
        setPatientData(null);
        fetchPatientData(1)
            .then(data => setPatientData(data))
            .catch(error => {
                console.error("Failed to fetch patient data:", error);
                Alert.alert("Error", "Could not load patient data.");
            });
    };

    const handleAddAppointment = async (newAppointment) => {
        try {
            // NOTE: Ensure this IP address is correct for your network.
            const response = await fetch('http://192.168.1.4:3001/api/patient/1/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAppointment),
            });

            if (!response.ok) throw new Error('Failed to add appointment');
            
            setIsModalVisible(false);
            loadData(); // Refresh data to show the new appointment

        } catch (error) {
            console.error("Error adding appointment:", error);
            Alert.alert("Error", "Could not book the appointment.");
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardScreen patient={patientData} onBookAppointmentPress={() => setIsModalVisible(true)} />;
            case 'chatbot':
                return <ChatbotScreen />; // Simplified for now
            case 'appointments':
                return <AppointmentsScreen appointments={patientData.appointments} />;
            case 'reports':
                return <ReportsScreen patient={patientData} />;
            default:
                return <DashboardScreen patient={patientData} onBookAppointmentPress={() => setIsModalVisible(true)} />;
        }
    };

    useEffect(() => {
        if (appStatus === 'loaded') loadData();
    }, [appStatus]);

    if (appStatus === 'loading') {
        return <SplashScreen onAnimationFinish={() => setAppStatus('loaded')} />;
    }
    
    if (!patientData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6D28D9" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header onMenuPress={() => setShowMenu(true)} />
            <View style={{ flex: 1 }}>{renderContent()}</View>
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
            <SideMenu user={patientData} isVisible={showMenu} onClose={() => setShowMenu(false)} />
            <AddAppointmentModal 
                isVisible={isModalVisible} 
                onClose={() => setIsModalVisible(false)}
                onAddAppointment={handleAddAppointment}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 16 }
});

