import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "../config/firebase";
import { logAction } from "./logService";
import { ROLES } from "../constants/roles";
import { getUserName } from "./adminService";

/* ===============================
   STUDENT -> VIEW TEACHER REPLIES
================================ */

export const getMessages = async (studentId) => {
  const q = query(
    collection(db, "appointments"),
    where("studentId", "==", studentId)
  );

  const snapshot = await getDocs(q);

  const messages = await Promise.all(
    snapshot.docs.map(async (docItem) => {
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
};

/* ===============================
   TEACHER -> VIEW STUDENT MESSAGES
================================ */

export const getTeacherMessages = async (teacherId) => {
  const q = query(
    collection(db, "appointments"),
    where("teacherId", "==", teacherId)
  );

  const snapshot = await getDocs(q);

  const messages = await Promise.all(
    snapshot.docs.map(async (docItem) => {
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
};


/* ===============================
   TEACHER -> REPLY TO MESSAGE
================================ */

export const replyMessage = async (teacherId, appointmentId, replyText) => {
  const ref = doc(db, "appointments", appointmentId);

  await updateDoc(ref, {
    teacherReply: replyText,
    replyAt: new Date()
  });

  await logAction(teacherId, "Replied to student message", ROLES.TEACHER);
};