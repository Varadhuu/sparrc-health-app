import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MessageCircle, Calendar, FileText, BarChart3 } from 'lucide-react-native';

const BottomNav = ({ activeTab, onTabChange }) => {
  const NavButton = ({ icon: Icon, label, isActive, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.navButton}>
      <Icon color={isActive ? '#6D28D9' : '#6B7280'} size={26} />
      <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.bottomNav}>
      <NavButton icon={BarChart3} label="Dashboard" isActive={activeTab === 'dashboard'} onPress={() => onTabChange('dashboard')} />
      <NavButton icon={MessageCircle} label="AI Coach" isActive={activeTab === 'chatbot'} onPress={() => onTabChange('chatbot')} />
      <NavButton icon={Calendar} label="Appointments" isActive={activeTab === 'appointments'} onPress={() => onTabChange('appointments')} />
      <NavButton icon={FileText} label="Reports" isActive={activeTab === 'reports'} onPress={() => onTabChange('reports')} />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  navButton: { alignItems: 'center', flex: 1 },
  navLabel: { fontSize: 10, color: '#6B7280', marginTop: 4 },
  navLabelActive: { color: '#6D28D9', fontWeight: '600' },
});

export default BottomNav;
