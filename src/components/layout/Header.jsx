import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItemButton, ListItemText, Divider, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/roles";
import { getDashboardRoute } from "../../utils/redirectRoles";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser(user.uid, user.role);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const title = user?.role === ROLES.ADMIN ? "Admin Dashboard" : user?.role === ROLES.STUDENT ? "Student Dashboard" : user?.role === ROLES.TEACHER ? "Teacher Dashboard" : "School Management";

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {(user?.role === ROLES.ADMIN || user?.role === ROLES.TEACHER || user?.role === ROLES.STUDENT) && (
            <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography sx={{ flexGrow: 1, cursor: "pointer" }} variant="h6" onClick={() => handleNavigate(getDashboardRoute(user))}>
            {title}
          </Typography>

          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {user?.role === ROLES.ADMIN && (
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 240 }}>
            <Toolbar>
              <Typography sx={{ cursor: 'pointer' }} variant="h6" onClick={() => handleNavigate(getDashboardRoute(user))}>Admin</Typography>
            </Toolbar>
            <Divider />
            <List>
              <ListItemButton onClick={() => handleNavigate("/admin")}>
                <ListItemText primary="Overview" />
              </ListItemButton>

              <ListItemButton onClick={() => handleNavigate("/admin/manage-teachers")}
              >
                <ListItemText primary="Manage Teachers" />
              </ListItemButton>

              <ListItemButton
                onClick={() => handleNavigate("/admin/approve-students")}
              >
                <ListItemText primary="Approve Students" />
              </ListItemButton>

              <Divider />

              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      )}

      {user?.role === ROLES.STUDENT && (
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 240 }}>
            <Toolbar>
              <Typography sx={{ cursor: "pointer" }} variant="h6" onClick={() => handleNavigate(getDashboardRoute(user))}>Student</Typography>
            </Toolbar>
            <Divider />
            <List>
              <ListItemButton
                onClick={() =>
                  handleNavigate("/student/messages")
                }
              >
                <ListItemText primary="Messages" />
              </ListItemButton>
              <ListItemButton
                onClick={() =>
                  handleNavigate("/student/book-appointment")
                }
              >
                <ListItemText primary="Book Appointment" />
              </ListItemButton>

              <ListItemButton
                onClick={() =>
                  handleNavigate("/student/appointment")
                }
              >
                <ListItemText primary="Appointments" />
              </ListItemButton>


              <Divider />

              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      )}

      {user?.role === ROLES.TEACHER && (
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 240 }}>
            <Toolbar>
              <Typography sx={{ cursor: "pointer" }} variant="h6" onClick={() => handleNavigate(getDashboardRoute(user))}>Teacher</Typography>
            </Toolbar>
            <Divider />
            <List>
              <ListItemButton
                onClick={() =>
                  handleNavigate("teacher/messages")
                }
              >
                <ListItemText primary="Messages" />
              </ListItemButton>
              <ListItemButton
                onClick={() =>
                  handleNavigate("teacher")
                }
              >
                <ListItemText primary="Appointments" />
              </ListItemButton>

              <Divider />

              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Header;