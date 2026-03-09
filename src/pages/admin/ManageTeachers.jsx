import { useEffect, useState, useMemo } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, Box, Button, } from "@mui/material";
import TeacherTable from "../../components/shared/TeacherTable";
import { getAllTeachers, updateTeacher, deleteTeacher } from "../../services/teacherService";
import { validateRequired } from "../../utils/validators";

const initialForm = {
  name: "",
  department: "",
  subject: "",
};

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const loadTeachers = async () => {
    try {
      const data = await getAllTeachers();
      setTeachers(data);
    } catch {
      showSnackbar("Failed to load teachers", "error");
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) =>
      `${t.name} ${t.department} ${t.subject}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [teachers, search]);

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(form.name)) newErrors.name = "Name is required";
    if (!validateRequired(form.department)) newErrors.department = "Department is required";
    if (!validateRequired(form.subject)) newErrors.subject = "Subject is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditOpen = (teacher) => {
    setForm({
      name: teacher.name || "",
      department: teacher.department || "",
      subject: teacher.subject || "",
    });

    setEditingId(teacher.id);
    setErrors({});
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await updateTeacher(editingId, form);

      showSnackbar("Teacher updated");
      setOpen(false);
      setEditingId(null);
      setForm(initialForm);

      loadTeachers();
    } catch {
      showSnackbar("Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      showSnackbar("Teacher deleted");
      loadTeachers();
    } catch {
      showSnackbar("Delete failed", "error");
    }
  };

  return (
    <Box p={3}>
      <TextField
        fullWidth
        placeholder="Search teacher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TeacherTable
        teachers={filteredTeachers}
        onDelete={handleDelete}
        onEdit={handleEditOpen}
        isAction
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Teacher</DialogTitle>

        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={form.name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            label="Department"
            fullWidth
            margin="normal"
            value={form.department}
            error={!!errors.department}
            helperText={errors.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />

          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={form.subject}
            error={!!errors.subject}
            helperText={errors.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={loading}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageTeachers;