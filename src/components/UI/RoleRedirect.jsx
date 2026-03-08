import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { getDashboardRoute } from "../../utils/redirectRoles";

const RoleRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={getDashboardRoute(user)} replace />;
};

export default RoleRedirect;
