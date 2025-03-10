import { collection, doc, CollectionReference } from "firebase/firestore";
import { IUser } from "./types";
import { db } from "@/database/firebase";
import { addDocFB, deleteDocFB, getDocFB, getDocsFB, updateDocFB } from "./fbCommon";

const USERS_COLLECTION = "users"; // Firestore collection name

export const getUsers = async (): Promise<IUser[]> => {
  return getDocsFB<IUser>(collection(db, USERS_COLLECTION) as CollectionReference<IUser>);
};

export const addUser = async (
  user: Omit<IUser, "id" | "password">
): Promise<{ status: number; message: string; id?: string }> => {
  var exist = false;
  const users = await getUsers();
  users.forEach((u) => {
    if (u.email === user.email) {
      exist = true;
    }
  });
  if (exist) {
    return { status: 0, message: "User already exists" };
  }
  const docRef = await addDocFB(
    collection(db, USERS_COLLECTION) as CollectionReference<IUser>,
    user
  );
  return {
    status: 1,
    message: "User added successfully",
    id: docRef,
  };
};

export const updateUser = async (userId: string, updates: Partial<Omit<IUser, "id">>) => {
  return updateDocFB(doc(db, USERS_COLLECTION, userId) as any, userId, updates);
};

export const deleteUser = async (userId: string) => {
  return deleteDocFB(doc(db, USERS_COLLECTION, userId) as any, userId);
};

export const getUser = async (userId: string): Promise<IUser> => {
  return getDocFB<IUser>(doc(db, USERS_COLLECTION, userId) as any, userId);
};
