import React, {useContext} from 'react';
import {Context} from '../../index'
import {
    Button,
    Table,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

export const TodoList = () => {
    const TodoStores = useContext(Context);
    const {todos} = TodoStores.todo;

    return (
        <div>
            <Typography variant="h5">
                Todos list
            </Typography>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>UserName</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Text</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.username}
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.text}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
            <Button
                variant="contained"
                color={'inherit'}
                onClick={() => {
                    console.log(todos)
                }}
            >
                Hello World
            </Button>
            </div>
        </div>
    )
};