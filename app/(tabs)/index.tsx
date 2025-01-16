import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

const Index: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const router = useRouter(); // Gunakan router untuk navigasi
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <View style={styles.container}>
      <View style={styles.Index}> 
        <Text style={[styles.title, isTablet && styles.tabletTitle, isDesktop && styles.desktopTitle]}>
          VIRTUAL TPB
        </Text>
        <Text style={[styles.subtitle, isTablet && styles.tabletSubtitle, isDesktop && styles.desktopSubtitle]}>
          Explore More Features
        </Text>
        <View style={[styles.buttonSec, (isTablet || isDesktop) && styles.buttonSecWide]}>
          <TouchableOpacity 
            style={[styles.logButton, (isTablet || isDesktop) && styles.buttonWide]} 
            onPress={() => router.push('/login')} // Gunakan `router.push` untuk navigasi
          >
            <Text style={styles.logButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.regButton, (isTablet || isDesktop) && styles.buttonWide]} 
            onPress={() => router.push('/register')} // Gunakan `router.push` untuk navigasi
          >
            <Text style={styles.regButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  Index: {
    flex: 1,
    backgroundColor: '#222831',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#00ADB5',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  tabletTitle: {
    fontSize: 36,
    letterSpacing: 20,
  },
  desktopTitle: {
    fontSize: 48,
    letterSpacing: 30,
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  tabletSubtitle: {
    fontSize: 18,
    letterSpacing: 8,
  },
  desktopSubtitle: {
    fontSize: 24,
    letterSpacing: 10,
  },
  buttonSec: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonSecWide: {
    flexDirection: 'row',
  },
  logButton: {
    padding: 15,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 100,
    width: '80%',
    maxWidth: 250,
    margin: 10,
    alignItems: 'center',
    opacity: 0.5,
  },
  regButton: {
    padding: 15,
    backgroundColor: 'transparent',
    borderColor: '#00ADB5',
    borderWidth: 2,
    borderRadius: 100,
    width: '80%',
    maxWidth: 250,
    margin: 10,
    alignItems: 'center',
    opacity: 0.7,
  },
  buttonWide: {
    width: '40%',
    maxWidth: 300,
  },
  logButtonText: {
    color: 'white',
    fontWeight: '600',
    letterSpacing: 5,
    fontSize: 14,
  },
  regButtonText: {
    color: '#00ADB5',
    fontWeight: '600',
    letterSpacing: 5,
    fontSize: 14,
  },
});

export default Index;

