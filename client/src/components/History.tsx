import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { RootState } from '../core/store'; // Update the path as needed to correctly import RootState

interface TripMessage {
    request: string;
    plan: string;
}

function History() {
    const trips = useSelector((state: RootState) => state.data.history as TripMessage[]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Request</strong></TableCell>
                        <TableCell align="right"><strong>Plan</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trips.map((trip, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {trip.request}
                            </TableCell>
                            <TableCell align="right">
                                {trip.plan}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default History;
