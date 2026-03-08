import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert, CircularProgress, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../utils/validators";

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(form.name)) {
      newErrors.name = "Full name is required";
    }

    if (!validateEmail(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!validatePassword(form.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setApiError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      await registerUser(
        form.name.trim(),
        form.email.trim(),
        form.password
      );

      navigate("/login");
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper sx={{ p: 4, width: 380 }}>
        <Typography variant="h5" gutterBottom>
          Create Account
        </Typography>

        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}

        <TextField
          name="name"
          label="Full Name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={22} /> : "Register"}
        </Button>
      </Paper>
    </Box>
  );
};