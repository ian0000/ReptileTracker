import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  CollectionReference,
  Firestore,
  DocumentData,
} from "firebase/firestore";

export const addDocFB = async <T>(
  collectionRef: CollectionReference<T>,
  data: T
): Promise<string> => {
  try {
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const updateDocFB = async <T>(
  collectionRef: CollectionReference<T>,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(collectionRef, docId);
    await updateDoc(docRef, data as any);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const deleteDocFB = async <T>(
  collectionRef: CollectionReference<T>,
  docId: string
): Promise<void> => {
  try {
    const docRef = doc(collectionRef, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export const getDocsFB = async <T>(collectionRef: CollectionReference<T>): Promise<T[]> => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};

export const getDocFB = async <T>(
  collectionRef: CollectionReference<T>,
  docId: string
): Promise<T> => {
  try {
    const docRef = doc(collectionRef, docId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Document not found");
    }
    return { id: docSnap.id, ...docSnap.data() } as T;
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};
