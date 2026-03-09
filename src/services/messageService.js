import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { logAction } from "./logService";
import { ROLES } from "../constants/roles";
import { getUserName } from "./adminService";

export const getMessages = async (studentId) => {
  try {
    const q = query(
      collection(db, "appointments"),
      where("studentId", "==", studentId)
    );

    const userDoc = await getDocs(q);

    const messages = await Promise.all(
      userDoc.docs.map(async (docItem) => {
        const data = docItem.data();
        const teacherName = await getUserName(data.teacherId);

        return {
          id: docItem.id,
          ...data,
          teacherName
        };
      })
    );

    return messages;
  } catch (error) {
    throw new Error(error.message || "Failed to load messages");
  }
};

export const getTeacherMessages = async (teacherId) => {
  try {
    const q = query(
      collection(db, "appointments"),
      where("teacherId", "==", teacherId)
    );

    const userDoc = await getDocs(q);

    const messages = await Promise.all(
      userDoc.docs.map(async (docItem) => {
        const data = docItem.data();
        const studentName = await getUserName(data.studentId);

        return {
          id: docItem.id,
          ...data,
          studentName
        };
      })
    );

    return messages;
  } catch (error) {
    throw new Error(error.message || "Failed to load messages");
  }
};

export const replyMessage = async (teacherId, appointmentId, replyText) => {
  try {
    const ref = doc(db, "appointments", appointmentId);
    await updateDoc(ref, {
      teacherReply: replyText,
      replyAt: new Date()
    });

    await logAction(teacherId, "Replied to student message", ROLES.TEACHER);
  } catch (error) {
    throw new Error(error.message || "Reply failed");
  }
};