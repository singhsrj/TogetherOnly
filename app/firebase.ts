'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDjtbHALS2-ig7HB-2qivNTXftVJl-3XMM",
  authDomain: "togetheronly-8e9c7.firebaseapp.com",
  projectId: "togetheronly-8e9c7",
  storageBucket: "togetheronly-8e9c7.firebasestorage.app",
  messagingSenderId: "984337457549",
  appId: "1:984337457549:web:64b79558456cdcd7fa5dc4",
  measurementId: "G-Q43X895LX9"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth
const auth = getAuth(app);

// Initialize Analytics
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && getAnalytics(app));
}

export { app, auth, analytics }; 