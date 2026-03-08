import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMessages } from "../../services/messageService";

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Stack,
  Divider
} from "@mui/material";

const StudentMessages = () => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    try {
      const data = await getMessages(user.uid);
      setMessages(data);
    } catch {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) loadMessages();
  }, [user]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box maxWidth={900} mx="auto" mt={4}>
      <Typography variant="h5" mb={3}>
        Messages
      </Typography>

      <Stack spacing={2}>
        {messages.map((msg) => {
          return <Paper key={msg.id} sx={{ p: 2 }} elevation={2}>
            <Typography fontWeight={600}>
              Teacher: {msg.teacherName || "Teacher"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Appointment Status: {msg.status}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography color="text.secondary">
              Your Message
            </Typography>

            <Typography>{msg.message}</Typography>

            {msg.teacherReply && (
              <>
                <Divider sx={{ my: 1 }} />

                <Typography color="primary">
                  Teacher Reply
                </Typography>

                <Typography>{msg.teacherReply}</Typography>
              </>
            )}
          </Paper>;
        })}
      </Stack>
    </Box>
  );
};

export default StudentMessages;