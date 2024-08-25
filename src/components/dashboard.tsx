import React from 'react';
import { Box, Typography } from '@mui/material';
import Chatbot from './chatbot'; // Import the Chatbot component
import WalletAuth from './wallet';
import Navbar from './navbar';

const Dashboard: React.FC = () => {
    return (
        <>
        <Navbar/>
        <Box display="flex" height="100vh" p={2}>
            {/* 70% Width Component - Chatbot with fixed height */}
            <Box
                flex="0 0 70%" // Takes 70% of the container width
                height="80vh" // Fixes the height to 80% of the viewport
                p={2}
                bgcolor="#f0f0f0"
                sx={{
                    borderRight: '1px solid #ddd',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '8px'
                }}
            >
                <Typography variant="h5" gutterBottom>
                    <Chatbot/>
                </Typography>
            </Box>

            {/* 30% Width Component - Sidebar with dynamic height */}
            <Box
                flex="1"
                height="80vh" // Takes the remaining 30% of the container width
                p={2}
                bgcolor="#f0f0f0"
                sx={{
                    overflowY: 'auto',
                    textAlign:'center',
                    borderRadius: '8px',
                    marginLeft: '20px' // Adds some spacing between the two components
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Wallet Details
                </Typography>
                <Typography variant="body1">
                    {/* Example content */}
                   <WalletAuth/>
                </Typography>
                {/* Add more content here to see the dynamic height adjustment */}
            </Box>
        </Box>

        </>
    );
};

export default Dashboard;
