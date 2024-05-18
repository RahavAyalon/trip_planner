import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';

import {TripMessage} from "../types/global.types";
import { RootState } from '../core/store';

function RecentTrips() {
    const trips = useSelector((state: RootState) => state.data.history as TripMessage[]);
    const tableStyle = {
        background: 'black',
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
                            <TableCell align="left" sx={tableStyle}><strong>Response</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trips.map((trip, index) => (
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
