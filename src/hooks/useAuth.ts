import { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getCurrentUser } from '../services/auth';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          try {
            const userData = await getCurrentUser(firebaseUser);
            setUser(userData);
          } catch (firestoreError) {
            // If Firestore fails, create a basic user object
            console.warn('Firestore not available, using basic user data');
            const basicUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              name: firebaseUser.displayName || 'User',
              joinDate: new Date().toISOString(),
              greenScore: 0,
              currentStreak: 0,
              longestStreak: 0,
              totalHabitsLogged: 0,
              badges: [],
              level: 1,
              xp: 0
            };
            setUser(basicUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};