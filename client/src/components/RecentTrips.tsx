import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';

import { ChatInteraction } from "../features/chat/chatSlice";
import { RootState } from '../core/store';

function RecentTrips() {
    const trips = useSelector((state: RootState) => state.data.history as ChatInteraction[]);
    const tableStyle = {
        background: '#212121',
        borderRadius: '10px',
        color: 'white',
        border: '1px solid white'
    };

    return (
        <TableContainer component={Paper} sx={{ ...tableStyle, minHeight: '50vh', m: 2 }}>
            <Table aria-label="simple table" sx={tableStyle}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={tableStyle}><strong>Request</strong></TableCell>
                        <TableCell align="left" sx={tableStyle}><strong>Plan</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trips.slice().reverse().map((trip, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row" sx={tableStyle}>
                                {trip.request}
                            </TableCell>
                            <TableCell align="left" sx={tableStyle}>
                                {trip.plan}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RecentTrips;
