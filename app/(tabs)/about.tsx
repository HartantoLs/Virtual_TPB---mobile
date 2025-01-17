//about
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../../components/navbar';

const About: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title2}>VIRTUAL TPB</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>About Us</Text>
        <View style={styles.aboutCard}>
          <Ionicons name="information-circle-outline" size={80} color="#00ADB5" />
          <Text style={styles.aboutTitle}>who are we?</Text>
          <Text style={styles.aboutDescription}>
            We are a group of passionate individuals working together to create innovative solutions
            for businesses and education. Our goal is to make the world more connected and accessible.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
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
    paddingBottom: 100, // Add space at the bottom for the Navbar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 20,
    textAlign: 'center',
  },
  aboutCard: {
    backgroundColor: '#393E46',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#EEEEEE',
    marginTop: 10,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#EEEEEE',
    textAlign: 'center',
    marginTop: 10,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#222831',
  },
});

export default About;