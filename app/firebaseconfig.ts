import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCOPi05GRfIsc4yPF2BbJC8_xyH7Els3So',
  authDomain: 'virtualtpb-6bb2d.firebaseapp.com',
  projectId: 'virtualtpb-6bb2d',
  storageBucket: 'virtualtpb-6bb2d.firebasestorage.app',
  messagingSenderId: '374687500728',
  appId: '1:374687500728:web:be8c0627af28fc45b7e74d',
  measurementId: 'G-GYWZF87MMR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, analytics, auth, firestore };
