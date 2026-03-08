import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
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
    console.log("👌 ~ bookAppointment ~ error:", error)
    throw new Error(error.message || "book appointment failed");
  }
};

export const getStudentAppointments = async (studentId) => {
  const q = query(
    collection(db, "appointments"),
    where("studentId", "==", studentId)
  );

  const snapshot = await getDocs(q);

  const data = await Promise.all(
    snapshot.docs.map(async (d) => {
      const item = { id: d.id, ...d.data() };
      const teacherName = await getUserName(item.teacherId);

      return {
        ...item,
        teacherName
      };
    })
  );

  return data;
};




// 🔹 Teacher: Get Appointments
export const getTeacherAppointments = async (teacherId) => {
  const q = query(
    collection(db, "appointments"),
    where("teacherId", "==", teacherId)
  );

  const snapshot = await getDocs(q);

  const data = await Promise.all(
    snapshot.docs.map(async (d) => {
      const item = { id: d.id, ...d.data() };
      const studentName = await getUserName(item.studentId);

      return {
        ...item,
        studentName
      };
    })
  );

  return data;
};


// 🔹 Approve Appointment
export const approveAppointment = async (teacherId, appointmentId) => {
  try {

    await updateDoc(doc(db, "appointments", appointmentId), {
      status: "approved"
    });

    await logAction(teacherId, "Approved Appointment", ROLES.TEACHER);
  } catch (error) {
    console.log("👌 ~ approveAppointment ~ error:", error)
    throw new Error(error.message || "approve appointment failed");
  }
};

// 🔹 Cancel Appointment
export const cancelAppointment = async (teacherId, appointmentId) => {
  try {
    await updateDoc(doc(db, "appointments", appointmentId), {
      status: "cancelled"
    });
    await logAction(teacherId, "Cancelled Appointment", ROLES.TEACHER);
  } catch (error) {
    console.log("👌 ~ approveAppointment ~ error:", error)
    throw new Error(error.message || "approve appointment failed");
  }
};





