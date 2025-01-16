import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/navbar';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon  :)</Text>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#222831',
  },
});
