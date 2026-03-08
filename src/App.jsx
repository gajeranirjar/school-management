import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";
import Loading from "./components/layout/Loading";
import { RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  const { loading } = useAuth();
  if (loading) return <Loading />;

  return <RouterProvider router={AppRoutes} fallbackElement={<Loading />} />
}

export default App;
