import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AppointmentTable from "../../components/shared/AppointmentTable";
import { getTeacherAppointments, approveAppointment, cancelAppointment } from "../../services/appointmentService";
import { Alert, Box, CircularProgress ,  } from "@mui/material";

const TeacherAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await getTeacherAppointments(user.uid);
      const sorted = [...data].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setAppointments(sorted);
    } catch {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) loadAppointments();
  }, [user]);

  const handleApprove = async (id) => {
    await approveAppointment(user.uid, id);
    loadAppointments();
  };

  const handleCancel = async (id) => {
    await cancelAppointment(user.uid, id);
    loadAppointments();
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;

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
