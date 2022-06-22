import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1565c0',
        },
    },
});

export const NavBar = () => {
    return (
        <ThemeProvider theme={theme}>
        <AppBar position="fixed">
            <Toolbar variant="regular">
                <IconButton color="inherit">
                <Typography variant="h6" component="div">
                    TodoList
                </Typography>
                </IconButton>
                <IconButton color="inherit">
                <Typography variant="h6" component="div">
                    AuthForAdmin
                </Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    );
};
