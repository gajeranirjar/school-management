import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" display='flex' alignItems='center' flexDirection='column' justifyContent='center' height='75vh' >
      <Typography variant="h3" gutterBottom>404</Typography>
      <Typography variant="h6" gutterBottom>Page Not Found</Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
};
