import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu } from 'lucide-react-native';
import SparrcLogo from './SparrcLogo'; // Import the logo component

const Header = ({ onMenuPress }) => (
  <View style={styles.header}>
    {/* Logo and Title are now grouped on the left */}
    <View style={styles.headerLeft}>
        <SparrcLogo size="small" />
        <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>SPARRC</Text>
            <Text style={styles.headerSubtitle}>Sports & Fitness Medicine Clinic</Text>
        </View>
    </View>
    
    {/* Menu button remains on the right */}
    <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
      <Menu color="#4B5563" size={24} />
    </TouchableOpacity>
  </View>
);

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
  menuButton: { 
    padding: 10 
  },
});

export default Header;
