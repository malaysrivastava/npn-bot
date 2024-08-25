import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { OnrampWebSDK } from '@onramp.money/onramp-web-sdk';
import axios from 'axios';

const url = 'https://4fb3-2401-4900-1c70-908a-8368-e587-4c74-ca74.ngrok-free.app/process';
const Events = {ONRAMP_WIDGET_TX_INIT:"ONRAMP_WIDGET_TX_INIT", 
    ONRAMP_WIDGET_TX_FINDING:"ONRAMP_WIDGET_TX_FINDING", 
    ONRAMP_WIDGET_TX_PURCHASING:"ONRAMP_WIDGET_TX_PURCHASING", 
    ONRAMP_WIDGET_TX_SENDING:"ONRAMP_WIDGET_TX_SENDING", 
    ONRAMP_WIDGET_TX_COMPLETED:"ONRAMP_WIDGET_TX_COMPLETED",
    ONRAMP_WIDGET_TX_SENDING_FAILED:"ONRAMP_WIDGET_TX_SENDING_FAILED", 
    ONRAMP_WIDGET_TX_PURCHASING_FAILED:"ONRAMP_WIDGET_TX_PURCHASING_FAILED", 
    ONRAMP_WIDGET_TX_FINDING_FAILED:"ONRAMP_WIDGET_TX_FINDING_FAILED",
    ONRAMP_WIDGET_READY:"ONRAMP_WIDGET_READY", 
ONRAMP_WIDGET_FAILED:"ONRAMP_WIDGET_FAILED", 
ONRAMP_WIDGET_CLOSE_REQUEST:"ONRAMP_WIDGET_CLOSE_REQUEST",
ONRAMP_WIDGET_CONTENT_COPIED:"ONRAMP_WIDGET_CONTENT_COPIED",
}

const Chatbot: React.FC = () => {

  const onrampInstance = new OnrampWebSDK({
    appId: 1, // replace this with the appID you got during onboarding process
    walletAddress: '0x495f519017eF0368e82Af52b4B64461542a5430B', // replace with user's wallet address
    flowType: 1, // 1 -> onramp || 2 -> offramp || 3 -> Merchant checkout
    fiatType: 1, // 1 -> INR || 2 -> TRY || 3 -> AED || 4 -> MXN || 5-> VND || 6 -> NGN etc. visit Fiat Currencies page to view full list of supported fiat currencies
    paymentMethod: 1, // 1 -> Instant transafer(UPI) || 2 -> Bank transfer(IMPS/FAST)
    lang: 'en', // for more lang values refer 
    // fiatAmount: 500,
    coinAmount: 20,
    // ... pass other configs
  });
    onrampInstance.on(Events.ONRAMP_WIDGET_CLOSE_REQUEST,()=>{
        console.log("close")
    })
    onrampInstance.on(Events.ONRAMP_WIDGET_CLOSE_REQUEST,()=>{
        console.log("cancelled")
    })
    onrampInstance.on(Events.ONRAMP_WIDGET_FAILED,()=>{
        console.log("failed")
    })
    onrampInstance.on(Events.ONRAMP_WIDGET_READY,()=>{
        console.log("ready")
    })
  const openWidget = () =>{
    onrampInstance.show()
  }
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
