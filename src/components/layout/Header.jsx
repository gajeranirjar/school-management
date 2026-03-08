
// // // import { signOut } from "firebase/auth";
// // // import { auth } from "../../firebase";
// // // import { useAuth } from "../../context/AuthContext";
// // import { useNavigate } from "react-router-dom";
// // import { AppBar, Toolbar, Typography, Button } from "@mui/material";

// // export const Header = () => {
// //   // const { user } = useAuth();
// //   const navigate = useNavigate();

// //   // const handleLogout = async () => {
// //   //   await signOut(auth);
// //   //   navigate("/login");
// //   // };

// //   return (
// //     <AppBar position="sticky">
// //       <Toolbar sx={{ justifyContent: "space-between" }}>
// //         <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/school")}>School Management</Typography>

// //         {/* {user && (
// //           <Button color="inherit" onClick={handleLogout}>
// //             Logout
// //           </Button>
// //         )} */}
// //       </Toolbar>
// //     </AppBar>
// //   );
// // }







// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";
// import { logoutUser } from "../../services/authService";
// import { useNavigate } from "react-router-dom";
// import { getDashboardRoute } from "../../utils/redirectRoles";

// const Header = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logoutUser(user.uid, user.role);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <AppBar position='fixed'>
//       <Toolbar>
//         <Typography sx={{ flexGrow: 1 , cursor: 'pointer' }} onClick={() => navigate(getDashboardRoute(user))}>
//           Student-Teacher Booking
//         </Typography>

//         {user && (
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;











// Header.jsx  (UPDATED – Added Student Drawer Menu + Default Book Appointment)

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box
} from "@mui/material";
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

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* ADMIN HEADER */}
          {user?.role === ROLES.ADMIN && (
            <>
              <IconButton
                color="inherit"
                edge="start"
                sx={{ mr: 2 }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Typography sx={{ flexGrow: 1, cursor: 'pointer' }} variant="h6" onClick={() => handleNavigate(getDashboardRoute(user))}>
                Admin Dashboard
              </Typography>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {/* STUDENT HEADER */}
          {user?.role === ROLES.STUDENT && (
            <>
              <IconButton
                color="inherit"
                edge="start"
                sx={{ mr: 2 }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Typography sx={{ flexGrow: 1, cursor: 'pointer' }} variant="h6" onClick={() => handleNavigate(getDashboardRoute(user))}>
                Student Dashboard
              </Typography>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {/* TEACHER HEADER */}
          {user?.role === ROLES.TEACHER && (
            <>
              <IconButton
                color="inherit"
                edge="start"
                sx={{ mr: 2 }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Typography sx={{ flexGrow: 1, cursor: 'pointer' }} variant="h6" onClick={() => handleNavigate(getDashboardRoute(user))}>
                Teacher Dashboard
              </Typography>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {/* OTHER USERS HEADER */}
          {user?.role === ROLES.USER && (
            <>
              <Typography
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => navigate(getDashboardRoute(user))}
              >
                School Management
              </Typography>

              {user && (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* ADMIN DRAWER */}
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

              <ListItemButton
                onClick={() => handleNavigate("/admin/manage-teachers")}
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

      {/* STUDENT DRAWER */}
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

      {/* TEACHER DRAWER */}
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
