import React, {useContext} from 'react';
import {Context} from '../../index'
import {observer} from 'mobx-react-lite';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Select,
    MenuItem
} from '@mui/material';

const ChangeStatusTodo = observer(() => {
    const {todo} = useContext(Context);
    const {
        openChangeStatusWindow,
        setOpenChangeStatusWindow,
        todosStatus,
        setTodosStatus,
        updateStatusTodo
    } = todo;
    console.log(todosStatus)
    return (
        <div>
            <Dialog open={openChangeStatusWindow} onClose={() => setOpenChangeStatusWindow(false)}>
                <DialogContent
                    sx={{minWidth: 250}}>
                    <DialogContentText>
                      Change status
                    </DialogContentText>
                    <Select
                        value={todosStatus}
                        fullWidth
                        variant="outlined"
                        onChange={((e) => setTodosStatus(e.target.value))}
                    >
                    <MenuItem value={true}>В работе</MenuItem>
                    <MenuItem value={false}>Не в работе</MenuItem>
                </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenChangeStatusWindow(false)}>Cancel</Button>
                    <Button onClick={() => {updateStatusTodo(); setOpenChangeStatusWindow(false)}}>Apply</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

export default ChangeStatusTodo;
