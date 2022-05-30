import React, {useContext} from 'react';
import {Context} from '../../index'
import {observer} from 'mobx-react-lite';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const FormDialog = observer(() => {
    const {todo} = useContext(Context);
    const {
        openDialogWindow,
        setOpenDialogWindow,
        setTodosData,
        createTodos,
        getEmail,
        getName,
        getDescriptionTodo,
        getValidationFields
    } = todo;
    console.log(getName)
    return (
        <div>
            <Dialog open={openDialogWindow} onClose={() => setOpenDialogWindow(false)}>
                <DialogTitle>Create todo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы можете тут оставить какое-либо todo
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        error={!getEmail}
                        id="email"
                        onChange={e => {
                            setTodosData({email: e.target.value})
                        }}
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        error={!getName}
                        label="Username"
                        onChange={e => {
                            setTodosData({username: e.target.value})
                        }}
                        type="name"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        error={!getDescriptionTodo}
                        id="text"
                        onChange={e => {
                            setTodosData({text: e.target.value})
                        }}
                        label="Todo description"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialogWindow(false)}>Cancel</Button>
                    <Button onClick={() => createTodos()} disabled={!getValidationFields}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

export default FormDialog;
