import { doc, updateDoc, collection, getDocs, query, where, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { logAction } from "./logService";
import { ROLES } from "../constants/roles";

export const getPendingStudents = async () => {
  try {
    const q = query(
      collection(db, "users"),
      where("role", "==", ROLES.USER),
      where("isActive", "==", true)
    );

    const data = await getDocs(q);
    return data.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to load pending students");
  }
};

export const approveStudent = async (adminId, studentId) => {
  try {
    await updateDoc(doc(db, "users", studentId), {
      role: ROLES.STUDENT
    });
    await logAction(adminId, "Approved Student", ROLES.ADMIN);
  } catch (error) {
    throw new Error(error.message || "Student approval failed");
  }
};

export const getUsers = async () => {
  try {
    const users = query(collection(db, 'users'), where("isActive", "==", true))
    const user = await getDocs(users);
    return user.docs.map((doc) => ({
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
    throw new Error(error.message || "Role update failed.");
  }
};

export const getUserName = async (uid) => {
  try {
    const ref = doc(db, "users", uid);
    const doc = await getDoc(ref);

    if (!doc.exists()) return "Unknown";

    const data = doc.data();
    return data.name || data.email || "Unknown";
  } catch {
    return "Unknown";
  }
};