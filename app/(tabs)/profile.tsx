import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TouchableWithoutFeedback, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, firestore } from '../firebaseconfig';  // Ensure you have Firebase initialized correctly
import { updateProfile, getAuth, updatePassword as firebaseUpdatePassword, User} from 'firebase/auth'; // For updating username
import { doc, updateDoc } from 'firebase/firestore'; // For Firestore updates
import Navbar from '../../components/navbar';
import firebase from 'firebase/app';
const Profile: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch current user data
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || 'User');  // Display the current username
    }
  }, []);

  // Function to update username in Firebase
  const updateUsername = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (user && newUserName !== '') {
      try {
        // Update username in Firebase Authentication
        await updateProfile(user, { displayName: newUserName });

        // Update username in Firestore
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, { username: newUserName });

        setUserName(newUserName); // Update local state for username
        Alert.alert('Success', 'Username has been updated.');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to update username.');
      } finally {
        setLoading(false);
      }
    } else {   // Type assertion to firebase.User for updatePassword
      Alert.alert('Error', 'Please enter a new username.');
    }
  };

  // Function to update password
  const updatePassword = async (newPassword: string) => {
    const auth = getAuth();
    const user: User | null = auth.currentUser;  // Using the User type from firebase/auth module
  
    if (user && newPassword !== '') {
      try {
        setLoading(true);
        // No need for type assertion, just use the User type directly
        await firebaseUpdatePassword(user, newPassword);  // Correct method for updating password in v9+
        Alert.alert('Success', 'Password has been updated.');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to update password.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Please enter a new password.');
    }
  };

  // Log out function
  const logOut = async () => {
    try {
      await auth.signOut();
      Alert.alert('Success', 'You have logged out successfully.');
      // route.push('/login')
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>VIRTUAL TPB</Text>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>My Profile</Text>
        <View style={styles.profileCard}>
          <Ionicons name="person-circle-outline" size={80} color="#00ADB5" />
          <Text style={styles.profileName}>{userName}</Text>
          <TextInput
            style={styles.input}
            placeholder="New Username"
            value={newUserName}
            onChangeText={setNewUserName}
          />
          <TouchableOpacity style={styles.editButton} onPress={updateUsername} disabled={loading}>
            <Text style={styles.editButtonText}>{loading ? 'Updating...' : 'Update Username'}</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
           <TouchableWithoutFeedback onPress={() => updatePassword(newPassword)}>
            <Text style={styles.editButtonText}>{loading ? 'Updating...' : 'Update Password'}</Text>
          </TouchableWithoutFeedback >

          <TouchableOpacity style={styles.editButton} onPress={logOut}>
            <Text style={styles.editButtonText}>Log Out</Text>
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
  input: {
    width: '80%',
    padding: 10,
    marginTop: 15,
    backgroundColor: '#222831',
    color: '#EEEEEE',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00ADB5',
  },
  editButton: {
    backgroundColor: '#00ADB5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  editButtonText: {
    color: '#EEEEEE',
    fontWeight: 'bold',
  },
});

export default Profile;
