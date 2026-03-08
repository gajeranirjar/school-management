import { Box, Paper, Typography, Stack, Avatar, Grid, Divider, Chip, } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const UserDashboard = () => {
  return (
    <Box sx={{ px: { xs: 0.5, sm: 4 } }}>
      <Paper
        sx={{
          p: { xs: 1.5, sm: 3, md: 4 },
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg,#1976d2,#42a5f5)",
          color: "white",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: "white", color: "#1976d2" }}>
            <SchoolIcon />
          </Avatar>
          <Box>
            <Typography variant="h5">Welcome to School Management System</Typography>
            <Typography variant="body2">Please wait until the admin assigns your role.</Typography>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={4}>
        <Grid>
          <Paper sx={{ p: 4, borderRadius: 3, width: 250, height: 240 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon color="primary" />
              <Typography variant="h6">School Hours</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography>Monday - Friday</Typography>
            <Typography>8:30 AM - 3:30 PM</Typography>

            <Chip
              label="Closed on Weekends"
              size="small"
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 4, borderRadius: 3, width: 250, height: 240 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MenuBookIcon color="primary" />
              <Typography variant="h6">Departments</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography>• Mathematics</Typography>
            <Typography>• Science</Typography>
            <Typography>• English</Typography>
            <Typography>• Computer Science</Typography>
            <Typography>• Social Studies</Typography>
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 4, borderRadius: 3, width: 250, height: 240 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <SupportAgentIcon color="primary" />
              <Typography variant="h6">Support</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography>Email: support@school.com</Typography>
            <Typography>Phone: +1 123 456 7890</Typography>

            <Chip
              label="Office Assistance Available"
              color="success"
              size="small"
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          About Our School
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1">
          Our school management system is designed to streamline student
          enrollment, teacher management, scheduling, communication, and
          administrative workflows.
        </Typography>

        <Typography variant="body1" mt={2}>
          Once your role is assigned by the administrator, you will gain access
          to features relevant to your responsibilities.
        </Typography>
      </Paper>
    </Box>
  );
};

export default UserDashboard;
