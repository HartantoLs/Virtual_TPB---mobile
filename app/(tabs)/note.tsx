import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../../components/navbar';

const Note: React.FC = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.title2}>VIRTUAL TPB</Text>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Notes</Text>
        <View style={styles.noteCard}>
          <Ionicons name="create-outline" size={48} color="#00ADB5" />
          <Text style={styles.noteTitle}>Important Note</Text>
          <Text style={styles.noteDescription}>
            Don't forget to complete your tasks for the day, and always stay updated with your work.
          </Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New Note</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  noteCard: {
    backgroundColor: '#393E46',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEEEEE',
    marginTop: 10,
    marginBottom: 5,
  },
  noteDescription: {
    fontSize: 14,
    color: '#EEEEEE',
    textAlign: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#00ADB5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#EEEEEE',
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginTop: 40,
    marginBottom: 20,
    letterSpacing: 5,
    textAlign: 'center',
    },
});

export default Note;
