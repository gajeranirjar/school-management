import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTeacherMessages, replyMessage } from "../../services/messageService";
import { Box, Typography, CircularProgress, Alert, Paper, Stack, Divider, Button, TextField } from "@mui/material";

const TeacherMessages = () => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    try {
      const data = await getTeacherMessages(user.uid);
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

  const handleReply = async (id) => {
    if (!replyText.trim()) return;

    try {
      setSending(true);

      await replyMessage(user.uid, id, replyText.trim());

      setReplyText("");
      setSelectedId(null);

      loadMessages();
    } catch {
      setError("Reply failed");
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box maxWidth={900} mx="auto" mt={4}>
      <Typography variant="h5" mb={3}>
        Student Messages
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack spacing={2}>
        {messages.map((msg) => (
          <Paper key={msg.id} sx={{ p: 2 }} elevation={2}>

            <Typography fontWeight={600}>
              Student: {msg.studentName || "Student"}
            </Typography>

            <Typography fontWeight={600}>
              Appointment Date: {msg.date}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography color="text.secondary">
              Student Message
            </Typography>

            <Typography>{msg.message}</Typography>

            {msg.teacherReply ? (
              <>
                <Divider sx={{ my: 1 }} />

                <Typography color="primary">
                  Your Reply
                </Typography>

                <Typography>{msg.teacherReply}</Typography>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Reply"
                  sx={{ mt: 2 }}
                  value={selectedId === msg.id ? replyText : ""}
                  onFocus={() => setSelectedId(msg.id)}
                  onChange={(e) => setReplyText(e.target.value)}
                />

                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  disabled={sending}
                  onClick={() => handleReply(msg.id)}
                >
                  Send Reply
                </Button>
              </>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default TeacherMessages;