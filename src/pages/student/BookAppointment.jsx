import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Alert,
  CircularProgress
} from "@mui/material";
import { getAllTeachers } from "../../services/teacherService";
import { bookAppointment } from "../../services/appointmentService";
import { useAuth } from "../../context/AuthContext";

const BookAppointment = () => {
  const { user } = useAuth();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    teacherId: "",
    date: "",
    message: ""
  });

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await getAllTeachers();
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setTeachers(sorted);
      } catch {
        setError("Failed to load teachers");
      }
    };

    loadTeachers();
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.teacherId || !form.date) {
      setError("Teacher and Date are required");
      return;
    }

    const selectedDate = new Date(form.date);
    if (selectedDate < new Date()) {
      setError("Appointment must be in the future");
      return;
    }

    try {
      setLoading(true);

      await bookAppointment(user.uid, form);

      setForm({
        teacherId: "",
        date: "",
        message: ""
      });
    } catch {
      setError("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box textAlign={'center'} >
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        select
        label="Select Teacher"
        fullWidth
        margin="normal"
        value={form.teacherId}
        onChange={(e) => handleChange("teacherId", e.target.value)}
      >
        {teachers.map((t) => (
          <MenuItem key={t.id} value={t.id}>
            {t.name} - {t.subject}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        type="datetime-local"
        fullWidth
        margin="normal"
        value={form.date}
        onChange={(e) => handleChange("date", e.target.value)}
      />

      <TextField
        label="Purpose"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={form.message}
        onChange={(e) => handleChange("message", e.target.value)}
      />

      <Button
        variant="contained"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? <CircularProgress size={24} /> : "Book Appointment"}
      </Button>
    </Box>
  );
};

export default BookAppointment;