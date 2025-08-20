import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  getDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Challenge } from '../types';

export const getChallenges = async (): Promise<Challenge[]> => {
  const querySnapshot = await getDocs(collection(db, 'challenges'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Challenge));
};

export const getUserChallenges = async (userId: string): Promise<Challenge[]> => {
  const q = query(
    collection(db, 'userChallenges'),
    where('userId', '==', userId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Challenge);
};

export const completeChallenge = async (userId: string, challengeId: string) => {
  await setDoc(doc(db, 'userChallenges', `${userId}_${challengeId}`), {
    userId,
    challengeId,
    completed: true,
    completedAt: new Date().toISOString()
  });
};