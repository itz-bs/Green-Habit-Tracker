import { doc, updateDoc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, Badge } from '../types';

export const updateUser = async (userId: string, updates: Partial<User>) => {
  await updateDoc(doc(db, 'users', userId), updates);
};

export const getUser = async (userId: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? userDoc.data() as User : null;
};

export const updateUserStats = async (userId: string, points: number) => {
  const user = await getUser(userId);
  if (!user) return;

  const newXp = user.xp + points;
  const newLevel = Math.floor(newXp / 100) + 1;
  const newGreenScore = user.greenScore + points;

  await updateDoc(doc(db, 'users', userId), {
    xp: newXp,
    level: newLevel,
    greenScore: newGreenScore,
    totalHabitsLogged: user.totalHabitsLogged + 1
  });
};

export const addBadge = async (userId: string, badge: Badge) => {
  const user = await getUser(userId);
  if (!user) return;

  const updatedBadges = [...user.badges, badge];
  await updateDoc(doc(db, 'users', userId), { badges: updatedBadges });
};

export const getLeaderboard = async (): Promise<User[]> => {
  const q = query(
    collection(db, 'users'),
    orderBy('greenScore', 'desc'),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as User);
};