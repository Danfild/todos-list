import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export const NavBar = () => {
    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar position="absolute">
            <Toolbar variant="regular">
                <IconButton color="inherit">
                <Typography variant="h6" color="inherit" component="div">
                    TodoList
                </Typography>
                </IconButton>
                <IconButton color="inherit">
                <Typography variant="h6" color="inherit" component="div">
                    AuthForAdmin
                </Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    );
};
