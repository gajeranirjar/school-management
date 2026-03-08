import { Box, Typography } from "@mui/material"

export const Footer = () => (
    <Box component='footer' textAlign="center" p={2} bgcolor="#f1f1f1" mt="auto" width='100%'>
      <Typography variant="caption">
        © {new Date().getFullYear()} School Management System
      </Typography>
    </Box>
);