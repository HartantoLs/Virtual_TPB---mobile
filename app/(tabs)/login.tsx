//login
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../firebasefunction'; // Pastikan path sesuai dengan lokasi file firebaseFunctions.ts
import { auth } from '../firebaseconfig'; // Import konfigurasi Firebase

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { width } = useWindowDimensions();
  const router = useRouter();

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const handleLogin = async () => {
    try {
      if (username && password) {
        setErrorMessage('');

        // Login dengan Firebase Authentication
        await loginUser(username, password);

        // Dapatkan pengguna yang sedang login
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log('User ID:', currentUser.uid); // UID untuk identifikasi
          console.log('Email:', currentUser.email);
          // console.log('username:', currentUser.username);
          // Navigasi ke dashboard
          router.push('/dashboard');
        } else {
          throw new Error('Failed to retrieve user after login.');
        }
      } else {
        setErrorMessage('Please enter both username and password.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isTablet && styles.tabletTitle, isDesktop && styles.desktopTitle]}>
        L o g i n
      </Text>
      <View style={[styles.card, isTablet && styles.tabletCard, isDesktop && styles.desktopCard]}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholder="Enter your email"
            placeholderTextColor="rgba(255,255,255,0.5)"
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
          style={({pressed}) => [
            styles.submitButton,
            pressed && styles.submitButtonPressed
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.submitButtonText}>Login</Text>
        </Pressable>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        {/* Link untuk registrasi */}
        <Pressable 
          onPress={() => router.push('/register')}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            Don't have an account? Register here
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1d21',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    letterSpacing: 15,
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
    shadowColor: 'r#222831#222831',
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
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 15,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'r#222831#222831',
  },
  submitButton: {
    backgroundColor: 'r#222831#222831',
    borderRadius: 100,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'r#222831#222831',
  },
  submitButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: [{ scale: 0.98 }],
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
    letterSpacing: 1,
  },
  errorMessage: {
    color: '#ff6b6b',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default Login;