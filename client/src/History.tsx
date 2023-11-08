import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@material-ui/core';

interface HistoryItem {
  query: string;
  response: string;
}

const ChatbotHistory = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() !== '') {
      // Simulating a response from the chatbot
      const response = `Response to: ${query}`;
      setHistory([...history, { query, response }]);
      setQuery('');
    }
  };

  // @ts-ignore
    return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Chatbot Search History
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter your query"
          variant="outlined"
          value={query}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Box mt={3}>
        {history.map((item, index) => (
          <Paper key={index} variant="outlined" style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Query:</strong> {item.query}
            </Typography>
            <Typography variant="body1">
              <strong>Response:</strong> {item.response}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ChatbotHistory;