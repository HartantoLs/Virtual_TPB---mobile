//dashboard
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { auth, firestore } from '../firebaseconfig'; // Ensure path is correct
import Navbar from '../../components/navbar';
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth, updatePassword as firebaseUpdatePassword, User } from 'firebase/auth';

const { width } = Dimensions.get('window');

export default function Page() {
  const router = useRouter();
  const [animatedValues] = useState(new Array(4).fill(0).map(() => new Animated.Value(0)));
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
              // console.log(foundUsername);
            }
          });
  
          if (foundUsername) {
            setUsername(foundUsername);  // Set username jika ditemukan
            console.log(username);
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

  useEffect(() => {
    
    
    // Animation when the component is rendered
    Animated.stagger(
      200,
      animatedValues.map(value =>
        Animated.spring(value, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        })
      )
    ).start();

    // Check login status and fetch username from Firestore
    const checkLoginStatus = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // try {
        //   // Fetch the user document from Firestore using the user's UID
        //   const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
        //   if (userDoc.exists()) {
        //     setUsername(userDoc.data()?.username || 'User');
        //   } else {
        //     setUsername('No username found');
        //   }
        // } catch (error) {
        //   console.error('Error fetching username:', error);
        //   setUsername('Error fetching username');
        // }
      } else {
        // If no user is logged in, redirect to login page
        router.push('/login');
      }
    };
    
    checkLoginStatus();
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchUsernameManually(); // Memanggil ulang fetch username setelah login
      } else {
        setUsername(null); // Reset username jika tidak ada user yang login
      }
    });

    return () => unsubscribe();
   
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroSection}>
          <Animated.Text style={[styles.heroTitle, { opacity: animatedValues[0] }]}>VIRTUAL TPB</Animated.Text>
          <Animated.Text style={[styles.heroSubtitle, { opacity: animatedValues[1] }]}>
            Make You Feel Better
          </Animated.Text>
          <Text style={styles.welcomeMessage}>
            Welcome, {username || 'Loading...'}
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featuresCard}>
            <Text style={styles.featuresTitle}>WELCOME TO VIRTUAL TPB</Text>
            <Text style={styles.featuresSubtitle}>
              Membantu meningkatkan pemahaman matkul TPB ITB
            </Text>
            <View style={styles.featuresGrid}>
              <FeatureCard
                href="/materi"
                icon={<Ionicons name="nuclear" size={48} color="#00ADB5" />}
                title="Fisika"
                description="Belajar lebih dalam mengenai materi, soal, dan eksperimen pada fisika"
                router={router}
                animatedValue={animatedValues[2]}
              />
              <FeatureCard
                href="/materi/matematika"
                icon={<Ionicons name="calculator" size={48} color="#00ADB5" />}
                title="Matematika"
                description="Coming Soon"
                router={router}
                animatedValue={animatedValues[2]}
              />
              <FeatureCard
                href="/materi/kimia"
                icon={<Ionicons name="flask" size={48} color="#00ADB5" />}
                title="Kimia"
                description="Coming Soon"
                router={router}
                animatedValue={animatedValues[3]}
              />
              <FeatureCard
                href="/materi/inggris"
                icon={<Ionicons name="language" size={48} color="#00ADB5" />}
                title="Inggris"
                description="Coming Soon"
                router={router}
                animatedValue={animatedValues[3]}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed By Hartanto & Louis</Text>
        </View>
      </ScrollView>

      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </View>
  );
}

function FeatureCard({
  href,
  icon,
  title,
  description,
  router,
  animatedValue,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  router: any;
  animatedValue: Animated.Value;
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Animated.View style={[styles.featureCard, {
      transform: [
        { scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1]
        }) },
      ],
      opacity: animatedValue,
    }]}>
      <Pressable
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={() => router.push(href)}
        style={({ pressed }) => [
          styles.featureCardContent,
          { transform: [{ scale: pressed ? 0.95 : 1 }] }
        ]}
      >
        <View style={styles.icon}>{icon}</View>
        <Text style={styles.featureCardTitle}>{title}</Text>
        <Text style={styles.featureCardDescription}>{description}</Text>
        <View style={[styles.activeButton, isPressed && styles.activeButtonPressed]}>
          <Text style={styles.buttonText}>Play</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#222831',
  },
  welcomeMessage: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#00ADB5',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  contentContainer: {
    padding: 16,
  },
  heroSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 5,
    color: '#00ADB5',
    textAlign: 'center',
  },
  heroSubtitle: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  featuresSection: {
    paddingVertical: 16,
  },
  featuresCard: {
    backgroundColor: '#393e46',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ADB5',
    textAlign: 'center',
    marginBottom: 8,
  },
  featuresSubtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: width > 600 ? '48%' : '100%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureCardContent: {
    padding: 16,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  featureCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222831',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureCardDescription: {
    fontSize: 14,
    color: '#393e46',
    textAlign: 'center',
    marginBottom: 16,
  },
  activeButton: {
    backgroundColor: '#00ADB5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  activeButtonPressed: {
    backgroundColor: '#008C94',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 36, 
  },
  footerText: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.7,
  },
});