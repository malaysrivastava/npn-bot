import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const url = 'https://4fb3-2401-4900-1c70-908a-8368-e587-4c74-ca74.ngrok-free.app/process';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            setMessages((prevMessages) => [...prevMessages, input]);
            setInput('');
            await axios.post(url, { user_input:input,isLogged:localStorage.getItem('isLoggedIn') === 'true' }).then((res)=>{
            setMessages((prevMessages) => [...prevMessages, res?.data?.message]);
            }).catch(()=>{
                setMessages((prevMessages) => [...prevMessages, 'Something went wrong']);
            })
            
        }
    };

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                height: '80vh',  // Set height to cover 80% of the viewport height
                maxHeight: '80vh', // Ensure it doesn’t exceed 80% of viewport height
                display: 'flex', 
                flexDirection: 'column', 
                backgroundColor: '#f0f0f0', // Grey background
                borderRadius: '8px',
                overflow: 'hidden' // To ensure overflow is hidden
            }}
        >
            <Box 
                p={2} 
                flex={1} 
                overflow="auto" 
                sx={{ 
                    borderBottom: '1px solid #ddd', 
                    backgroundColor: '#fff', // White background for messages area
                    borderRadius: '8px 8px 0 0' 
                }}
            >
                {messages.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">
                        No messages yet. Start the conversation!
                    </Typography>
                ) : (
                    messages.map((msg, index) => (
                        <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                            {msg}
                        </Typography>
                    ))
                )}
            </Box>
            <Box 
                p={2} 
                component="form" 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    backgroundColor: '#e0e0e0', // Grey background for input area
                    borderRadius: '0 0 8px 8px'
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    sx={{ mr: 1, borderRadius: '4px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleSend}
                >
                    Send
                </Button>
            </Box>
        </Paper>
    );
};

export default Chatbot;
