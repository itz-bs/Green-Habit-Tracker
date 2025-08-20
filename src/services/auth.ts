import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

export const signUp = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  const userData: User = {
    id: user.uid,
    email: user.email!,
    name,
    joinDate: new Date().toISOString(),
    greenScore: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalHabitsLogged: 0,
    badges: [],
    level: 1,
    xp: 0
  };
  
  await setDoc(doc(db, 'users', user.uid), userData);
  return userData;
};

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};

export const getCurrentUser = async (firebaseUser: FirebaseUser): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  return userDoc.exists() ? userDoc.data() as User : null;
};