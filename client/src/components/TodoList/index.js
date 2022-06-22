import React, {useContext} from 'react';
import {Context} from '../../index'
import {observer} from 'mobx-react-lite';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styles from './todoListStyle.scss';
import CreateTodo from "./CreateTodo";
import ChangeStatusTodo from "./ChangeStatusTodo";
import EditTodoText from "./EditTodoText";
import AlertComponent from "./Alert";

const TodoList = observer(() => {
    const {todo, users} = useContext(Context);
    const {isAuth} = users;
    const {
        todos,
        count,
        limit,
        offset,
        setLimit,
        setOffset,
        setOpenDialogWindow,
        setOpenEditWindow,
        setOpenChangeStatusWindow,
        setCheckedItem,
        setCurrentTodo
    } = todo;

    const checkIsChecked = Boolean(todos.find(({isChecked}) => isChecked))
    return (
        <div className="alert">
            <Typography
                align={'center'}
                gutterBottom={true}
                noWrap={true}
                variant="h3">
                Todos list
            </Typography>
            <div>
                <TableContainer component={Paper}>
                    <Table size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell >Status</TableCell>
                                <TableCell align="left">UserName</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="center">Text</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    {isAuth && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={row.isChecked ? row.isChecked : false}
                                                onClick={() => {
                                                    setCheckedItem(row.id, !row.isChecked);
                                                }}
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell>{row.status === true ? 'В работе' : 'Не в работе'}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell
                                        sx={{maxWidth: 100}}
                                        align="justify"
                                        size={"medium"}
                                    >
                                        {isAuth && (
                                            <Button
                                            className="editButtonText"
                                            size={"small"}
                                            startIcon={<EditIcon/>}
                                            onClick={() => {
                                                setOpenEditWindow(true);
                                                setCurrentTodo(row.id, row.text)
                                            }}
                                        />
                                            )}
                                        {row.text}
                                    </TableCell>
                                </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                    {count > 3 && (
                        <TablePagination
                            rowsPerPageOptions={[3, 6, 10]}
                            component="div"
                            count={count}
                            rowsPerPage={limit}
                            page={offset}
                            onPageChange={setOffset}
                            onRowsPerPageChange={setLimit}
                        />
                    )}
                </TableContainer>
            </div>
            {isAuth && (
                <div className="button">
                    <Button
                        variant="contained"
                        color={'primary'}
                        onClick={() => setOpenDialogWindow(true)}
                    >
                        Create todo
                    </Button>
                    {checkIsChecked && (
                        <Button
                        className="editButton"
                        variant="contained"
                        color={'primary'}
                        onClick={() => setOpenChangeStatusWindow(true)}
                    >
                       Change status
                    </Button>
                    )}
                    <CreateTodo />
                    <ChangeStatusTodo />
                    <EditTodoText />
                </div>
            )}
        </div>
    )
});

export default TodoList;