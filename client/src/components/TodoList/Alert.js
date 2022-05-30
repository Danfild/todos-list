import React, {useContext} from 'react';
import {Context} from '../../index'
import {observer} from 'mobx-react-lite';
import {
    Box,
    Alert,
    IconButton,
    Collapse
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertComponent = observer(() => {
    const {todo} = useContext(Context);
    const {
        openAlert,
        setOpenAlert,
        alertMessage
    } = todo;

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={openAlert}>
                <Alert
                    severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {alertMessage}
                </Alert>
            </Collapse>
        </Box>
    );
})

export default AlertComponent;

