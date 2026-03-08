import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AppointmentTable from "../../components/shared/AppointmentTable";
import {
  getTeacherAppointments,
  approveAppointment,
  cancelAppointment
} from "../../services/appointmentService";

const TeacherAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const data = await getTeacherAppointments(user.uid);
    setAppointments(data);
  };

  useEffect(() => {
    loadAppointments()
  }, []);

  const handleApprove = async (id) => {
    await approveAppointment(user.uid, id);
    loadAppointments();
  };

  const handleCancel = async (id) => {
    await cancelAppointment(user.uid, id);
    loadAppointments();
  };

  return (
    <AppointmentTable
      appointments={appointments}
      showActions
      onApprove={handleApprove}
      onCancel={handleCancel}
      role={user.role}
    />
  );
};

export default TeacherAppointments;
