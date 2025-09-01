import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, ActivityIndicator, Text, Alert, ScrollView, RefreshControl } from 'react-native';

import { fetchPatientData, updatePatientData } from './src/api';
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';
import SideMenu from './src/components/SideMenu';
import SplashScreen from './src/components/SplashScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import AddAppointmentModal from './src/components/AddAppointmentModal';
import ProfileScreen from './src/screens/ProfileScreen'; // Import the new profile screen

export default function App() {
    const [appStatus, setAppStatus] = useState('loading');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showMenu, setShowMenu] = useState(false);
    const [patientData, setPatientData] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    // State to control which main view is visible: 'main' or 'profile'
    const [activeScreen, setActiveScreen] = useState('main'); 
    const [isSaving, setIsSaving] = useState(false);

    const loadData = async () => {
        try {
            const data = await fetchPatientData(1);
            setPatientData(data);
        } catch (error) {
            console.error("Failed to fetch patient data:", error);
        }
    };
    
    const onRefresh = async () => {
        setIsRefreshing(true);
        await loadData();
        setIsRefreshing(false);
    };
    
    useEffect(() => {
        if (appStatus === 'loaded' && !patientData) {
            loadData();
        }
    }, [appStatus, patientData]);

    // Function to handle saving profile changes
    const handleSaveProfile = async (updatedPatient) => {
        setIsSaving(true);
        try {
            await updatePatientData(updatedPatient);
            setPatientData(updatedPatient); // Update the local state immediately
            Alert.alert("Success", "Your profile has been updated.");
            setActiveScreen('main'); // Navigate back to the main app view
        } catch (error) {
            Alert.alert("Error", "Could not save your profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleAppointmentAdded = () => {
        loadData().then(() => {
            setActiveTab('appointments');
        });
        setModalVisible(false);
    };
    
    const renderMainContent = () => {
        if (activeTab === 'dashboard') return <DashboardScreen patient={patientData} onBookAppointment={() => setModalVisible(true)} onViewReports={() => setActiveTab('reports')} />;
        if (activeTab === 'chatbot') return <ChatbotScreen conversations={patientData?.chatbot_conversations} />;
        if (activeTab === 'appointments') return <AppointmentsScreen appointments={patientData?.appointments} onRefresh={onRefresh} isRefreshing={isRefreshing} />;
        if (activeTab === 'reports') return <ReportsScreen patient={patientData} />;
        return null;
    };

    const renderMainApp = () => (
        <>
            <Header onMenuPress={() => setShowMenu(true)} />
            <View style={{ flex: 1 }}>
                {/* Logic to prevent nesting scrollable components */}
                {activeTab === 'chatbot' || activeTab === 'appointments' ? (
                    <View style={{ flex: 1, paddingBottom: 80 }}>{renderMainContent()}</View>
                ) : (
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 80 }}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={["#6D28D9"]} />}
                    >
                        {renderMainContent()}
                    </ScrollView>
                )}
            </View>
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
            <SideMenu 
                user={patientData} 
                isVisible={showMenu} 
                onClose={() => setShowMenu(false)}
                // Pass the navigation function to the SideMenu
                onNavigate={(screen) => {
                    setActiveScreen(screen);
                    setShowMenu(false);
                }}
            />
            <AddAppointmentModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onAddAppointment={handleAppointmentAdded}
                patientId={patientData?.id}
                doctorId={patientData?.doctor_id}
            />
        </>
    );

    if (appStatus === 'loading') {
        return <SplashScreen onAnimationFinish={() => setAppStatus('loaded')} />;
    }

    if (!patientData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6D28D9" />
                <Text style={styles.loadingText}>Loading Patient Data...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {/* Conditionally render the main app or the profile screen */}
            {activeScreen === 'main' ? (
                renderMainApp()
            ) : (
                <ProfileScreen 
                    patient={patientData} 
                    onSave={handleSaveProfile}
                    onBack={() => setActiveScreen('main')}
                    isLoading={isSaving}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#4B5563'
    }
});

