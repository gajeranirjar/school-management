// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import Loading from "../layout/Loading";
// import { Alert, Box } from "@mui/material";

// const PrivateRoute = ({ children, role }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <Loading />;
//   if (!user) return <Navigate to="/login" replace />;
//   if (user.isActive === false) return <Navigate to="/login" replace />;

//   if (role && user.role !== role && user.role !== "admin") {
//     return (
//       <Box p={3} mt={4} >
//         <Alert severity="error"> You don't have permission to access this page.</Alert>
//       </Box>
//     );
//   }

//   return children;
// };

// export default PrivateRoute;


import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../layout/Loading"

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace/>;
  if (allowedRole && user.role !== allowedRole && user.role !== "admin" ) return <Navigate to="/error" />;
  return children;
};

export default PrivateRoute;

