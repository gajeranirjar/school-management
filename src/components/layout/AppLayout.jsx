import { Outlet } from "react-router-dom";
import { Box, Container, Toolbar } from "@mui/material";
import Header from "./Header";
import { Footer } from "./Footer";

const AppLayout = () => {

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Toolbar />
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default AppLayout;