import { collection, doc, getDocs, query, updateDoc, where, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { logAction } from "./logService";
import { ROLES } from "../constants/roles";

const usersRef = collection(db, "users");

export const getAllTeachers = async () => {
  const q = query(
    usersRef,
    where("role", "==", ROLES.TEACHER),
    where("isActive", "==", true)
  );

  const result = await getDocs(q);

  return result.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateTeacher = async (id, data) => {
  await updateDoc(doc(db, "users", id), {
    ...data,
    updatedAt: serverTimestamp()
  });

  await logAction(id, "Update Teacher", ROLES.TEACHER);
};

export const deleteTeacher = async (id) => {
  await updateDoc(doc(db, "users", id), {
    isActive: false,
    updatedAt: serverTimestamp()
  });

  await logAction(id, "Delete Teacher", ROLES.TEACHER);
};