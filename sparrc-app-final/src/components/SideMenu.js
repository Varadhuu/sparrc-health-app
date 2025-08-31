import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { User, Settings, HelpCircle, X } from 'lucide-react-native';

const SideMenu = ({ user, isVisible, onClose }) => {
    // Don't render anything if there's no user data yet to prevent crashes
    if (!user) {
        return null;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.sideMenuBackdrop} activeOpacity={1} onPress={onClose}>
                <View style={styles.sideMenuContainer}>
                    <View style={styles.sideMenuHeader}>
                        <View>
                            <Text style={styles.sideMenuName}>{user.patient_name}</Text>
                            <Text style={styles.sideMenuId}>ID: {user.id}</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X color="#fff" size={24} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.sideMenuItem}>
                        <User color="#4B5563" size={22} />
                        <Text style={styles.sideMenuItemText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sideMenuItem}>
                        <Settings color="#4B5563" size={22} />
                        <Text style={styles.sideMenuItemText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sideMenuItem}>
                        <HelpCircle color="#4B5563" size={22} />
                        <Text style={styles.sideMenuItemText}>Help & Support</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
  sideMenuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  sideMenuContainer: {
    backgroundColor: 'white',
    height: '100%',
    width: '80%',
    position: 'absolute',
    right: 0,
    paddingTop: 60,
    paddingHorizontal: 20
  },
  sideMenuHeader: {
    backgroundColor: '#6D28D9',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: -20,
    marginTop: -60,
    marginBottom: 20
  },
  sideMenuName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  sideMenuId: {
    color: '#D8B4FE',
    fontSize: 14
  },
  closeButton: {
    padding: 10
  },
  sideMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  sideMenuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#1F2937'
  },
});

export default SideMenu;
