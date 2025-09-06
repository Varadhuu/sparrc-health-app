import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, ActivityIndicator, Text, Alert, ScrollView, RefreshControl, InteractionManager } from 'react-native';

import { fetchPatientData, updatePatientData } from './src/api';
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';
import SplashScreen from './src/components/SplashScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import AddAppointmentModal from './src/components/AddAppointmentModal';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
    const [appStatus, setAppStatus] = useState('loading');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [patientData, setPatientData] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeScreen, setActiveScreen] = useState('main'); 
    const [isSaving, setIsSaving] = useState(false);

    const loadData = async () => {
        try {
            // Use InteractionManager to defer data loading until after animations
            await new Promise(resolve => InteractionManager.runAfterInteractions(resolve));
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
        if (appStatus === 'loaded') {
            // Start loading data immediately when splash finishes
            if (!patientData) {
                loadData();
            }
        }
    }, [appStatus, patientData]);

    const handleSaveProfile = async (updatedPatient) => {
        setIsSaving(true);
        try {
            await updatePatientData(updatedPatient);
            setPatientData(updatedPatient);
            Alert.alert("Success", "Your profile has been updated.");
            setActiveScreen('main');
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
        // --- THIS IS THE CHANGE ---
        // The AppointmentsScreen now receives the onBookAppointment function
        if (activeTab === 'appointments') return <AppointmentsScreen appointments={patientData?.appointments} onRefresh={onRefresh} isRefreshing={isRefreshing} onBookAppointment={() => setModalVisible(true)} />;
        if (activeTab === 'reports') return <ReportsScreen patient={patientData} />;
        return null;
    };

    const renderMainApp = () => (
        <>
            <Header 
                patientName={patientData?.patient_name} 
                onProfilePress={() => setActiveScreen('profile')} 
            />
            <View style={{ flex: 1 }}>
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

