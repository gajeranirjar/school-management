import { addDoc, collection, getDocs, query, where, updateDoc, doc, serverTimestamp, } from "firebase/firestore";
import { db } from "../config/firebase";
import { logAction } from "./logService";
import { ROLES } from "../constants/roles";
import { getUserName } from "./adminService";

export const bookAppointment = async (studentId, data) => {
  try {
    await addDoc(collection(db, "appointments"), {
      teacherId: data.teacherId,
      studentId,
      date: data.date,
      message: data.message || "",
      status: "pending",
      createdAt: serverTimestamp()
    });

    await logAction(studentId, "Booked Appointment", ROLES.STUDENT);
  } catch (error) {
    throw new Error(error.message || "book appointment failed");
  }
};

export const getStudentAppointments = async (studentId) => {
  try {
    const q = query(
      collection(db, "appointments"),
      where("studentId", "==", studentId)
    );

    const data = await getDocs(q);

    const result = await Promise.all(
      data.docs.map(async (d) => {
        const item = { id: d.id, ...d.data() };
        const teacherName = await getUserName(item.teacherId);

        return {
          ...item,
          teacherName
        };
      })
    );
    return result;
  } catch (error) {
    throw new Error(error.message || "Failed to load appointments");
  }
};

export const getTeacherAppointments = async (teacherId) => {
  try {
    const q = query(
      collection(db, "appointments"),
      where("teacherId", "==", teacherId)
    );

    const data = await getDocs(q);

    const result = await Promise.all(
      data.docs.map(async (d) => {
        const item = { id: d.id, ...d.data() };
        const studentName = await getUserName(item.studentId);
        return {
          ...item,
          studentName
        };
      })
    );
    return result;
  } catch (error) {
    throw new Error(error.message || "Failed to load appointments");
  }
};

export const approveAppointment = async (teacherId, appointmentId) => {
  try {
    await updateDoc(doc(db, "appointments", appointmentId), {
      status: "approved"
    });

    await logAction(teacherId, "Approved Appointment", ROLES.TEACHER);
  } catch (error) {
    throw new Error(error.message || "Approve appointment failed");
  }
};

export const cancelAppointment = async (teacherId, appointmentId) => {
  try {
    await updateDoc(doc(db, "appointments", appointmentId), {
      status: "cancelled"
    });
    await logAction(teacherId, "Cancelled Appointment", ROLES.TEACHER);
  } catch (error) {
    throw new Error(error.message || "Cancel appointment failed");
  }
};
