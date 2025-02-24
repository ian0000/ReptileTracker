import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { IUser } from "./types";
import { db } from "@/database/firebase";

const USERS_COLLECTION = "users"; // Firestore collection name

export const addUser = async (user: Omit<IUser, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), user);
    return docRef.id;
  } catch (error) {
    console.log("Error adding document: ", error);
    throw error;
  }
};

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IUser[];
  } catch (error) {
    console.log("Error getting documents: ", error);
    throw error;
  }
};

export const updateUser = async (userId: string, updates: Partial<Omit<IUser, "id">>) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, updates);
    console.log("Document successfully updated!");
  } catch (error) {
    console.log("Error updating document: ", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await deleteDoc(userRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.log("Error deleting document: ", error);
    throw error;
  }
};
