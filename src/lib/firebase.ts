
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-6460644499-b67da",
  "appId": "1:918465104136:web:f7ad904f600d551be244bd",
  "storageBucket": "studio-6460644499-b67da.firebasestorage.app",
  "apiKey": "AIzaSyBmP18pCsHt0LVDSk83lFVSIyQ-CczMulE",
  "authDomain": "studio-6460644499-b67da.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "918465104136"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
