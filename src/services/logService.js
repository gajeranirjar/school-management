import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export const logAction = async (userId, action, role) => {
  try {
    await addDoc(collection(db, "logs"), {
      userId,
      action,
      role,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
};
