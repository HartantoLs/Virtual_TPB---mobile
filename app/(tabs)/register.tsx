import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '../firebasefunction'; 

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { width } = useWindowDimensions();
  const router = useRouter();

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const handleRegister = async () => {
    try {
      if (email && password) {
        setErrorMessage('');

        // Fungsi registrasi dengan Firebase
        await registerUser(email, password, email); // Menggunakan email sebagai username
        router.push('/login');
      } else {
        setErrorMessage('Please enter both email and password.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred while registering.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isTablet && styles.tabletTitle, isDesktop && styles.desktopTitle]}>
        R e g i s t e r
      </Text>
      <View style={[styles.card, isTablet && styles.tabletCard, isDesktop && styles.desktopCard]}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholder="Enter your email"
            placeholderTextColor="rgba(255,255,255,0.5)"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter your password"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </View>
        <Pressable 
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.submitButtonPressed
          ]}
          onPress={handleRegister}
        >
          <Text style={styles.submitButtonText}>Register</Text>
        </Pressable>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        
        <Pressable 
          onPress={() => router.push('/login')}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>
            Already have an account? Login here
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1d21',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    letterSpacing: 11,
    marginBottom: 40,
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
  },
  tabletTitle: {
    fontSize: 32,
    letterSpacing: 20,
  },
  desktopTitle: {
    fontSize: 40,
    letterSpacing: 25,
  },
  card: {
    width: '90%',
    padding: 30,
    backgroundColor: 'rgba(30, 33, 37, 0.95)',
    borderRadius: 20,
    shadowColor: 'rgba(255, 255, 255, 0.1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  tabletCard: {
    width: '70%',
    padding: 35,
  },
  desktopCard: {
    width: '40%',
    padding: 40,
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
    marginBottom: 8,
    fontSize: 16,
    letterSpacing: 5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 15,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  submitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 100,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  submitButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: [{ scale: 0.98 }],
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
    letterSpacing: 3,
  },
  errorMessage: {
    color: '#ff6b6b',
    marginTop: 15,
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default Register;