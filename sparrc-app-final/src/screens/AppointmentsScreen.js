import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, RefreshControl, TouchableOpacity } from 'react-native';
import { Users, Globe, Plus } from 'lucide-react-native';

const formatDateTime = (isoString) => {
    if (!isoString) return 'No date provided';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
};

const getStatusStyles = (status) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'confirmed') {
        return { backgroundColor: '#D1FAE5', color: '#065F46' };
    }
    if (lowerStatus === 'waiting for confirmation') {
        return { backgroundColor: '#FEF3C7', color: '#92400E' };
    }
    return { backgroundColor: '#F3F4F6', color: '#4B5563' };
};

const AppointmentsScreen = ({ appointments = [], onRefresh, isRefreshing, onBookAppointment }) => {
    
    const sections = useMemo(() => {
        const now = new Date();
        const upcoming = [];
        const completed = [];

        appointments.forEach(appointment => {
            const appointmentDate = new Date(appointment.appointment_date);
            if (appointmentDate >= now) {
                upcoming.push(appointment);
            } else {
                completed.push(appointment);
            }
        });

        const data = [];
        if (upcoming.length > 0) {
            data.push({ title: 'Upcoming', data: upcoming });
        }
        if (completed.length > 0) {
            data.push({ title: 'Completed', data: completed });
        }
        return data;
    }, [appointments]);
    
    const renderItem = ({ item }) => {
        const statusStyles = getStatusStyles(item.status);
        return (
            <View style={styles.listItem}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.listItemTitle}>{item.reason}</Text>
                    <Text style={styles.listItemSubtitle}>with {item.doctor_name}</Text>
                    <Text style={styles.listItemTime}>{formatDateTime(item.appointment_date)}</Text>
                    
                    <View style={styles.extraDetailsContainer}>
                        <View style={styles.extraDetailItem}>
                            {item.consultation_type === 'Online' ? <Globe size={14} color="#4B5563"/> : <Users size={14} color="#4B5563"/>}
                            <Text style={styles.extraDetailText}>{item.consultation_type}</Text>
                        </View>
                        <Text style={styles.extraDetailText}>•</Text>
                        <View style={styles.extraDetailItem}>
                            <Text style={styles.extraDetailText}>{item.branch}</Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.statusBadge, { backgroundColor: statusStyles.backgroundColor, color: statusStyles.color }]}>
                    {item.status}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={["#6D28D9"]} />}
                ListHeaderComponent={<Text style={styles.screenTitle}>Appointments</Text>}
                ListEmptyComponent={<Text style={styles.noAppointmentsText}>You have no scheduled appointments.</Text>}
                contentContainerStyle={styles.listContentContainer}
            />
            <TouchableOpacity style={styles.fab} onPress={onBookAppointment}>
                <Plus color="#fff" size={28} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContentContainer: {
        paddingHorizontal: 20,
    },
    screenTitle: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        color: '#111827' 
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        backgroundColor: '#F9FAFB',
        paddingVertical: 10,
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
        elevation: 2 
    },
    detailsContainer: { flex: 1 },
    listItemTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
    listItemSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 2 },
    listItemTime: { fontSize: 14, color: '#6D28D9', marginTop: 4, fontWeight: '500' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, fontSize: 12, fontWeight: 'bold', overflow: 'hidden', marginLeft: 10, textTransform: 'capitalize' },
    noAppointmentsText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#6B7280' },
    extraDetailsContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8, opacity: 0.8 },
    extraDetailItem: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
    extraDetailText: { fontSize: 12, color: '#4B5563', marginLeft: 4, marginRight: 4 },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6D28D9',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    }
});

export default AppointmentsScreen;

