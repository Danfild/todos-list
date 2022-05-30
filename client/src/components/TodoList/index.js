import React, {useContext, MouseEvent} from 'react';
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
import FormDialog from "./CreateTodoDialog";
import AlertComponent from "./Alert";

const TodoList = observer(() => {
    const {todo, users} = useContext(Context);
    const {isAuth} = users;
    const {
        todos,
        getTodos,
        count,
        limit,
        offset,
        setLimit,
        setOffset,
        setOpenDialogWindow
    } = todo;

    return (
        <div style={{padding: '80px'}}>
            <AlertComponent/>
            <Typography
                align={'center'}
                gutterBottom={true}
                noWrap={true}
                variant="h3">
                Todos list
            </Typography>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 500}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow
                                hover
                                // onClick={(event) => handleClick(event, row.name)}
                                role="checkbox"
                                aria-checked={true}
                                key={54}
                                // selected={isItemSelected}
                            >
                                {isAuth && (
                                <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={null}
                                            // inputProps={{
                                            //     'aria-labelledby': 77,
                                            // }}
                                        />
                                    </TableCell>
                                )}
                                <TableCell component="th" scope="row">UserName</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="center">Text</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos.map((row, index) => (<TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                {/*{isAuth && (*/}
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={null}
                                            // inputProps={{
                                            //     'aria-labelledby': 77,
                                            // }}
                                        />
                                    </TableCell>
                                {/*)}*/}
                                    <TableCell component="th" scope="row">{row.username}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="center">{row.text}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[3, 6, 10]}
                        component="div"
                        count={count}
                        rowsPerPage={limit}
                        page={offset}
                        onPageChange={setOffset}
                        onRowsPerPageChange={setLimit}
                    />
                </TableContainer>
            </div>
            {isAuth && (
                <div style={{padding: '10px'}}>
                <Button
                    variant="contained"
                    color={'inherit'}
                    onClick={() => setOpenDialogWindow(true)}
                >
                    Create todo
                </Button>
                    <FormDialog />
            </div>
            )}
        </div>
    )
});

export default TodoList;