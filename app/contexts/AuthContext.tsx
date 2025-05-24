'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener');
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user ? 'User logged in' : 'No user');
        setUser(user);
        setLoading(false);
      }, (error) => {
        console.error('Auth state change error:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('Attempting Google sign in...');
      const provider = new GoogleAuthProvider();
      // Add select_account to force account selection
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const result = await signInWithPopup(auth, provider);
      console.log('Sign in successful:', result.user.email);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      if (error instanceof Error) {
        alert(`Sign in failed: ${error.message}`);
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting sign out...');
      await firebaseSignOut(auth);
      console.log('Sign out successful');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      if (error instanceof Error) {
        alert(`Sign out failed: ${error.message}`);
      }
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 