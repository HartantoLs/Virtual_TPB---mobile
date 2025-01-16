import { auth, firestore } from './firebaseconfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

// Login user
export async function loginUser(email: string, password: string) {
  try {
    // Sign in the user using email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get the username from Firestore using the userId (uid)

    console.log('UID USER ADALAH: ',user.uid);
    const userDocRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);
    

    // If the user document exists in Firestore, get the username
    let username = '';
    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log('User Data:', userData);
      username = userData?.username || 'User';
    } else {
      console.log('No such user!');
    }

    // Return the user object including uid, email, and username
    return { id: user.uid, email: user.email, username};
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// Register user
export async function registerUser(email: string, password: string, username: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDocRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      throw new Error('User already exists');
    }
    await addDoc(collection(firestore, 'users'), {
      userId: user.uid,
      email,
      username,
    });
    return { id: user.uid, email, username };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// Logout user
export async function logoutUser() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// Add game history


const saveGameResult = async (result: string, distanceToFinish: number) => {
  try {
    const user = auth.currentUser;  // Mendapatkan user yang sedang login
    if (user) {
      // Menyimpan data permainan ke koleksi 'game_history'
      await addDoc(collection(firestore, 'game_history'), {
        userId: user.uid,  // Menggunakan UID dari Firebase Auth untuk menyimpan data terkait user
        result,  // Status kemenangan atau kekalahan
        distanceToFinish,
        timestamp: Timestamp.now(),  // Waktu saat permainan selesai
      });
      console.log("Game result saved:", result, "Distance to finish:", distanceToFinish);
    } else {
      console.log("User not logged in, can't save game result.");
    }
  } catch (error) {
    console.error("Error saving game result:", error);
  }
};


const fetchGameHistory = async () => {
  const user = auth.currentUser;  // Mendapatkan user yang sedang login
  if (user) {
    try {
      const gameHistoryQuery = query(
        collection(firestore, 'game_history'),
        where('userId', '==', user.uid)  // Filter berdasarkan userId
      );

      const querySnapshot = await getDocs(gameHistoryQuery);
      const history = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Game History:', history);
      return history;
    } catch (error) {
      console.error("Error fetching game history:", error);
    }
  } else {
    console.log("User not logged in.");
    return [];
  }
};
