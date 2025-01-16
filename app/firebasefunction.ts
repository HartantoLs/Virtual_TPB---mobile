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
    const userDocRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);
    console.log('Doc :', docSnap.data());

    // If the user document exists in Firestore, get the username
    let username = '';
    if (docSnap !== null) {
      const userData = docSnap.data();
      console.log('User Data:', userData);
      username = userData?.username || 'User';
    } else {
      console.log('No such user!');
    }

    // Return the user object including uid, email, and username
    return { id: user.uid, email: user.email, username };
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
export async function addGameHistory(
  userId: string,
  gameId: string,
  status: 'win' | 'lose',
  distance: number
) {
  try {
    await addDoc(collection(firestore, 'game_history'), {
      userId,
      gameId,
      status,
      distance,
      startTime: Timestamp.now(),
    });
    return true;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// Fetch game history
export async function fetchGameHistory(userId: string) {
  try {
    const q = query(collection(firestore, 'game_history'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const history = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return history;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
