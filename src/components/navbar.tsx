import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const Logout = async () => {
        // IMP START - Logout
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInfo');
        handleMenuClose();
        window.location.href = '/';
      };

    const profileImage = localStorage.getItem('userInfo');

    return (
        <AppBar position="static" color="secondary">
            <Toolbar>
                {/* Logo or Brand Name */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    AutoN
                </Typography>

                {/* Profile Icon */}
                <IconButton color="inherit" onClick={handleMenuClick}>
                    <Avatar alt="Profile" src={profileImage as string} />
                </IconButton>

                {/* Menu for Profile and Options */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={Logout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
