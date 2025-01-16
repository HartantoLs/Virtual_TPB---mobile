import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/dashboard')} style={styles.navItem}>
        <Ionicons name="home-outline" size={24} color="#EEEEEE" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/note')} style={styles.navItem}>
        <Ionicons name="pencil-outline" size={24} color="#EEEEEE" />
        <Text style={styles.navText}>Note</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/about')} style={styles.navItem}>
        <Ionicons name="information-circle-outline" size={24} color="#EEEEEE" />
        <Text style={styles.navText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/profile')} style={styles.navItem}>
        <Ionicons name="person-outline" size={24} color="#EEEEEE" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 0,
    width: '100%',
    alignSelf: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#EEEEEE',
    fontSize: 12,
    marginTop: 2,
  },
});

export default Navbar;
