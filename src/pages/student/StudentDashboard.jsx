import { useEffect, useState, useMemo } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllTeachers } from "../../services/teacherService";
import TeacherTable from "../../components/shared/TeacherTable";

const StudentDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await getAllTeachers();
        setTeachers(data);
      } catch {
        setError("Failed to load teachers");
      }
    };
    loadTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) =>
      [t.name, t.department, t.subject]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [teachers, search]);

  return (
    <Box p={3}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        fullWidth
        placeholder="Search by name, department or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <TeacherTable teachers={filteredTeachers} />
    </Box>
  );
};

export default StudentDashboard;