// import { useEffect, useState } from "react";
// import { TextField } from "@mui/material";
// import { getAllTeachers } from "../../services/teacherService";
// import TeacherTable from "../../components/shared/TeacherTable";


// const StudentDashboard = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [filtered, setFiltered] = useState([]);
  
//   useEffect(() => {
//     const loadTeachers = async () => {
//       const data = await getAllTeachers();
//       setTeachers(data);
//       setFiltered(data);
//     };
//     loadTeachers();
//   }, []);


//   const handleSearch = (value) => {
//     const result = teachers.filter(t => t.name.toLowerCase().includes(value.toLowerCase()));
//     setFiltered(result);
//   };

//   return (
//     <>
//       <TextField
//         label="Search by Name"
//         fullWidth
//         margin="normal"
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//       <TeacherTable teachers={filtered} />
//     </>
//   );
// };


// export default StudentDashboard;




import { useEffect, useState, useMemo } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllTeachers } from "../../services/teacherService";
import TeacherTable from "../../components/shared/TeacherTable";

const StudentDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadTeachers = async () => {
      const data = await getAllTeachers();
      setTeachers(data);
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