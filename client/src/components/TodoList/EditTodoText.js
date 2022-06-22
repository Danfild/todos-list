import React, {useContext} from 'react';
import {Context} from '../../index'
import {observer} from 'mobx-react-lite';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import styles from './todoListStyle.scss';

const EditTodoText = observer(() => {

    const {todo} = useContext(Context);
    const {
        openEditWindow,
        setOpenEditWindow,
        updateTodos,
        currentTodo,
        setCurrentTodo
    } = todo;
    const {id, text, status} = currentTodo;

    return (
        <div>
            <Dialog open={openEditWindow} onClose={() => setOpenEditWindow(false)}>
                <DialogTitle>Edit text todo</DialogTitle>
                <DialogContent sx={{width: 500}} >
                    <TextField
                        onChange={({target}) => {
                            setCurrentTodo(id, target.value)
                        }}
                        value={text}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditWindow(false)}>Cancel</Button>
                    <Button onClick={() => {
                        updateTodos(id);
                        setOpenEditWindow(false)
                    }}>Apply</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

export default EditTodoText;
