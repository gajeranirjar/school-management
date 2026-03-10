import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStudentAppointments } from "../../services/appointmentService";
import AppointmentTable from "../../components/shared/AppointmentTable";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { ROLES } from "../../constants/roles";

const StudentAppointments = () => {
    const { user } = useAuth();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getStudentAppointments(user.uid);
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

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Box mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );

    return (
        <Box mt={4}>
            <Typography variant="h5" mb={2}>
                My Appointments
            </Typography>

            <AppointmentTable
                appointments={appointments}
                role={ROLES.STUDENT}
            />
        </Box>
    );
};

export default StudentAppointments;