import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../../components/navbar';
import { StatusBar } from 'expo-status-bar';

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.title2}>VIRTUAL TPB</Text>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <Text style={styles.title}>My Profile</Text>
        <View style={styles.profileCard}>
          <Ionicons name="person-circle-outline" size={80} color="#00ADB5" />
          <Text style={styles.profileName}>Your Name</Text>
          <Text style={styles.profileDescription}>
            A passionate developer, teacher, and small business owner.
          </Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginTop: 40,
    marginBottom: 20,
    letterSpacing: 5,
    textAlign: 'center',
    },
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#393E46',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EEEEEE',
    marginTop: 10,
  },
  profileDescription: {
    fontSize: 14,
    color: '#EEEEEE',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#00ADB5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#EEEEEE',
    fontWeight: 'bold',
  },
});

export default Profile;
