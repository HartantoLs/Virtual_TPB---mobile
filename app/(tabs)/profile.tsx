import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebaseconfig';  // Pastikan Firebase sudah terinisialisasi dengan benar
import { getAuth, updatePassword as firebaseUpdatePassword, User } from 'firebase/auth';  // Untuk pembaruan password
import Navbar from '../../components/navbar';
import { useRouter } from 'expo-router';
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';

const Profile: React.FC = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false); // Untuk menampilkan form password baru
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null); 

  const fetchUsernameManually = async () => {
    try {
      const auth = getAuth();  // Ambil instance auth dari Firebase
      const user = auth.currentUser;  // Ambil currentUser dari Firebase Authentication

      if (user) {
        const db = getFirestore();
        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);

        let foundUsername = null;

        // Loop manual untuk mencari username berdasarkan userId
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          // console.log('user id: ', user.uid)
          if (docData.userId === user.uid) {  // Pencocokan berdasarkan userId
            foundUsername = docData.username;
            console.log("found username adalah : ", foundUsername);
          }
        });

        if (foundUsername) {
          setUsername(foundUsername);  // Set username jika ditemukan
          
        } else {
          console.log('No matching userId found.');
        }
      } else {
        console.log('No user is signed in.');
      }
    } catch (error) {
      console.error('Error fetching username manually:', error);
    }
  };
  const fetchUsername = async () => {
    try {
      const auth = getAuth();  // Ambil instance auth dari Firebase
      const user = auth.currentUser;  // Ambil currentUser dari Firebase Authentication
  
      if (user) {
        // Ambil instance Firestore
        const db = getFirestore();
        // Ambil dokumen pengguna dari koleksi 'users' berdasarkan user.uid
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        // console.log('data user : ', userDoc.data());
        if (userDoc.exists()) {
          
          setUsername(userDoc.data().username);  // Ambil data username dari dokumen dan simpan ke state
        } else {
          console.log('No such username!');
        }
      } else {
        console.log('No user is signed in');
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  // Fungsi untuk memperbarui password
  const updatePassword = async () => {
    const auth = getAuth();
    const user: User | null = auth.currentUser;  // Menggunakan tipe User dari firebase/auth module

    // Verifikasi bahwa password baru dan konfirmasi password cocok
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Password dan konfirmasi password tidak cocok.');
      return;
    }

    if (user && newPassword !== '') {
      try {
        setLoading(true);
        await firebaseUpdatePassword(user, newPassword);  // Menggunakan metode yang benar untuk pembaruan password
        Alert.alert('Success', 'Password telah diperbarui.');
        setShowPasswordForm(false); // Menyembunyikan form setelah sukses
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Gagal memperbarui password.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Harap masukkan password baru.');
    }
  };

  // Fungsi keluar
  const logOut = async () => {
    try {
      await auth.signOut();
      setUsername(null); 
      // localStorage.clear(); 
      // sessionStorage.clear();
      Alert.alert('Success', 'Anda telah berhasil keluar.');
      router.push('/login') 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal keluar.');
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchUsernameManually(); // Memanggil ulang fetch username setelah login
      } else {
        setUsername(null); // Reset username jika tidak ada user yang login
      }
    });

  }, []);  
  return (
    <View style={styles.container}>
      <Text style={styles.title2}>VIRTUAL TPB</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>My Profile</Text>
        <View style={styles.profileCard}>
          <Ionicons name="person-circle-outline" size={80} color="#00ADB5" />
           <Text style={styles.welcomeMessage}>
                    Welcome, {username || 'Loading...'}
            </Text>
          {/* Dropdown untuk membuka form perubahan password */}
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowPasswordForm(!showPasswordForm)} // Toggle form
          >
            <Text style={styles.dropdownText}>
              {showPasswordForm ? 'Cancel' : 'Ganti Password'}
            </Text>
          </TouchableOpacity>

          {/* Tampilkan form password baru jika dropdown ditekan */}
          {showPasswordForm && (
            <>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.editButton}
                onPress={updatePassword}
                disabled={loading}
              >
                <Text style={styles.editButtonText}>
                  {loading ? 'Updating...' : 'Update Password'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.editButton} onPress={logOut}>
            <Text style={styles.editButtonText}>Log Out</Text>
          </TouchableOpacity>
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
  welcomeMessage: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#00ADB5',
    textAlign: 'center',
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
  dropdownButton: {
    width: '80%',
    backgroundColor: '#00ADB5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  dropdownText: {
    color: '#EEEEEE',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#FF5733',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 30,
  },
  editButtonText: {
    color: '#EEEEEE',
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

export default Profile;