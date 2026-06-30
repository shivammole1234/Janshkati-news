import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Article } from '../types';

export interface FirestoreArticle extends Omit<Article, 'id'> {
  timestamp?: any;
}

export interface FirestoreReel {
  id?: string;
  title: {
    english: string;
    marathi: string;
    hindi: string;
  };
  description: {
    english: string;
    marathi: string;
    hindi: string;
  };
  videoUrl: string;
  views: string;
  likes: number;
  commentsCount: number;
  reporter: {
    name: string;
    avatar: string;
    role: string;
  };
  city: {
    english: string;
    marathi: string;
    hindi: string;
  };
  tag: {
    english: string;
    marathi: string;
    hindi: string;
  };
  timestamp?: any;
}

/**
 * Fetch all articles from Firestore, ordered by creation timestamp desc
 */
export async function getArticlesFromFirestore(): Promise<Article[]> {
  try {
    const q = query(collection(db, 'articles'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const list: Article[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: docSnap.id,
        ...data,
      } as Article);
    });
    return list;
  } catch (error) {
    console.warn("Failed to fetch articles from Firestore, using offline fallback:", error);
    return [];
  }
}

/**
 * Helper to recursively remove keys with 'undefined' values
 * so that Firestore does not crash with unsupported field value errors.
 */
function cleanUndefined(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefined);
  }
  const cleanObj: any = {};
  for (const key of Object.keys(obj)) {
    if (obj[key] !== undefined) {
      cleanObj[key] = cleanUndefined(obj[key]);
    }
  }
  return cleanObj;
}

/**
 * Add a new article to Firestore
 */
export async function addArticleToFirestore(article: Omit<Article, 'id'>): Promise<string> {
  const cleaned = cleanUndefined(article);
  const docRef = await addDoc(collection(db, 'articles'), {
    ...cleaned,
    timestamp: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Delete an article from Firestore
 */
export async function deleteArticleFromFirestore(id: string): Promise<void> {
  await deleteDoc(doc(db, 'articles', id));
}

/**
 * Fetch all reels from Firestore, ordered by creation timestamp desc
 */
export async function getReelsFromFirestore(): Promise<FirestoreReel[]> {
  try {
    const q = query(collection(db, 'reels'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const list: FirestoreReel[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: docSnap.id,
        ...data,
      } as FirestoreReel);
    });
    return list;
  } catch (error) {
    console.warn("Failed to fetch reels from Firestore, using offline fallback:", error);
    return [];
  }
}

/**
 * Add a new reel to Firestore
 */
export async function addReelToFirestore(reel: Omit<FirestoreReel, 'id' | 'timestamp'>): Promise<string> {
  const cleaned = cleanUndefined(reel);
  const docRef = await addDoc(collection(db, 'reels'), {
    ...cleaned,
    timestamp: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Delete a reel from Firestore
 */
export async function deleteReelFromFirestore(id: string): Promise<void> {
  await deleteDoc(doc(db, 'reels', id));
}
