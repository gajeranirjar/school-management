import { useEffect, useState } from "react";
import { Box, Grid, Card, Typography, CircularProgress, Stack, Chip, LinearProgress } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import ManageUsers from "./ManageUsers";
import { getUsers } from "../../services/adminService";
import { ROLES } from "../../constants/roles";


const StatCard = ({ title, value, icon, color, loading }) => (
  <Card
    sx={{
      borderRadius: 4,
      p: 2,
      background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      transition: "0.3s",
      "&:hover": { transform: "translateY(-5px)" }
    }}
    elevation={3}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h4" fontWeight="bold" mt={1}>
          {loading ? <CircularProgress size={24} /> : value}
        </Typography>

        <Chip
          icon={<TrendingUpIcon />}
          label="Active"
          size="small"
          color="success"
          sx={{ mt: 1 }}
        />
      </Box>

      {icon}
    </Stack>

    <Box mt={2}>
      <LinearProgress
        variant="determinate"
        value={Math.min(value * 5, 100)}
        sx={{ height: 6, borderRadius: 5 }}
      />
    </Box>
  </Card>
);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = {
    students: users.filter((u) => u.role === ROLES.STUDENT).length,
    teachers: users.filter((u) => u.role === ROLES.TEACHER).length,
    users: users.length
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box sx={{ p: 4 }}>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Overview
      </Typography>

      <Grid container spacing={3} mb={4}>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            loading={loading}
            title="Total Students"
            value={stats.students}
            color="#1976d2"
            icon={<SchoolIcon fontSize="large" color="primary" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            loading={loading}
            title="Total Teachers"
            value={stats.teachers}
            color="#2e7d32"
            icon={<PersonIcon fontSize="large" color="success" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            loading={loading}
            title="Total Users"
            value={stats.users}
            color="#9c27b0"
            icon={<GroupIcon fontSize="large" color="secondary" />}
          />
        </Grid>

      </Grid>

      <Grid container>
        <Grid item xs={12} width={'100%'}>
          <ManageUsers
            users={users}
            setUsers={setUsers}
            loading={loading}
          />
        </Grid>
      </Grid>

    </Box>
  );
};

export default AdminDashboard;