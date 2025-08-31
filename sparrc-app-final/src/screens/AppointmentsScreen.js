import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentsScreen = ({ appointments }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenTitle}>Appointments</Text>
    {appointments.map(apt => (
      <View key={apt.id} style={styles.listItem}>
        <View>
          <Text style={styles.listItemTitle}>{apt.specialty}</Text>
          <Text style={styles.listItemSubtitle}>{apt.doctor}</Text>
          <Text style={styles.listItemTime}>{apt.time}</Text>
        </View>
        <Text style={[styles.statusBadge, {backgroundColor: apt.status === 'confirmed' ? '#D1FAE5' : '#FEF3C7', color: apt.status === 'confirmed' ? '#065F46' : '#92400E'}]}>{apt.status}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  screenContainer: { padding: 20 },
  screenTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  listItem: { backgroundColor: '#fff', borderRadius: 12, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  listItemTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  listItemSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  listItemTime: { fontSize: 14, color: '#6D28D9', marginTop: 4, fontWeight: '500' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 12, fontWeight: '500' },
});

export default AppointmentsScreen;
