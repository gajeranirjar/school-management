import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { db, auth } from "../config/firebase";
import { logAction } from "./logService";
import { ROLES } from "../constants/roles";

const usersRef = collection(db, "users");

export const getAllTeachers = async () => {
  const q = query(
    usersRef,
    where("role", "==", ROLES.TEACHER),
    where("isActive", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

// export const updateUserRole = async (adminId, userId, newRole) => {
//   await updateDoc(doc(db, "users", userId), {
//     role: newRole
//   });

//   await logAction(adminId, "Role Updated", newRole);
// };

export const addTeacher = async (adminEmail, adminPassword, teacherData) => {
  const { email, password, name, department, subject } = teacherData;
  const credential = await createUserWithEmailAndPassword(auth,email,password);

  await setDoc(doc(db, "users", credential.user.uid), {
    name,
    email,
    department,
    subject,
    role: ROLES.TEACHER,
    isActive: true,
    createdAt: serverTimestamp()
  });

  await logAction(credential.user.uid, "Teacher Account Created", ROLES.TEACHER);

  await signInWithEmailAndPassword(auth, adminEmail, adminPassword);

};

export const updateTeacher = async (id , data) => {
  await updateDoc(doc(db, "users", id), {
    ...data,
    updatedAt: serverTimestamp()
  });

  await logAction(id , "Update Teacher", ROLES.TEACHER);
};

export const deleteTeacher = async (id) => {
  await updateDoc(doc(db, "users", id), {
    isActive: false,
    updatedAt: serverTimestamp()
  });

  await logAction(id, "Delete Teacher", ROLES.TEACHER);
};