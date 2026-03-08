import { doc, updateDoc, collection, getDocs, query, where, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { logAction } from "./logService";
import { ROLES } from "../constants/roles";

export const getPendingStudents = async () => {
  const q = query(
    collection(db, "users"),
    where("role", "==", ROLES.USER),
    where("isActive", "==", true)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const approveStudent = async (adminId, studentId) => {
  await updateDoc(doc(db, "users", studentId), {
    role: ROLES.STUDENT
  });

  await logAction(adminId, "Approved Student", ROLES.ADMIN);
};

export const getUsers = async () => {
  try {
    const user = query(collection(db, 'users'), where("isActive", "==", true))
    const users = await getDocs(user);

    return users.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(error.message || "failed to load users.");
  }
}

export const updateUserRole = async (adminId, userId, role) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      role
    });

    await logAction(adminId, `Changed role to ${role}`, ROLES.ADMIN);
  } catch (error) {
    throw new Error(error.message || "update failed.");
  }
};

export const getUserName = async (uid) => {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return "Unknown";

    const data = snap.data();
    return data.name || data.email || "Unknown";
  } catch {
    return "Unknown";
  }
};