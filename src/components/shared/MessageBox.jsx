import { Box, Typography } from "@mui/material";

const MessageBox = ({ messages }) => {
  return (
    <Box>
      {messages.map(msg => (
        <Box key={msg.id} mb={2} p={2} border="1px solid #ddd">
          <Typography>{msg.content}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MessageBox;
