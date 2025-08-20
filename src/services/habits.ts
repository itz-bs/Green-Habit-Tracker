import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Habit } from '../types';

export const addHabit = async (habit: Omit<Habit, 'id'>) => {
  const docRef = await addDoc(collection(db, 'habits'), habit);
  return { id: docRef.id, ...habit };
};

export const getUserHabits = async (userId: string): Promise<Habit[]> => {
  const q = query(
    collection(db, 'habits'),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Habit));
};

export const updateHabit = async (habitId: string, updates: Partial<Habit>) => {
  await updateDoc(doc(db, 'habits', habitId), updates);
};

export const deleteHabit = async (habitId: string) => {
  await deleteDoc(doc(db, 'habits', habitId));
};