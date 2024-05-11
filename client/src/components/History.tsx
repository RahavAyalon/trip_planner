import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Trip {
    request: string;
    plan: string;
}

function History() {
    const [trips, setTrips] = useState<Trip[]>([]);

    const mockTrips: Trip[] = [
        {
            request: "Plan a 1 day family trip for Paris under 200$",
            plan: 'Visit the Louvre and Eiffel Tower. Enjoy a boat tour on the Seine.'
        },
        {
            request: "Plan a 3 day solo trip for Tokyo under 500$",
            plan: 'Explore Shinjuku, visit the Meiji Shrine, and experience Akihabara.'
        },
        {
            request: "I want to travel with my friends to New York for 2 days under 300$",
            plan: 'See the Statue of Liberty, walk in Central Park, and catch a Broadway show.'
        },
        {
            request: "I'm traveling for a cultural trip in Cairo for a day. I have 150$",
            plan: 'Visit the Pyramids of Giza and the Egyptian Museum.'
        },
        {
            request: 'I’m traveling to Sydney with my girlfriend for 5 days. The budget is 1000$',
            plan: 'Enjoy the beaches, the Sydney Opera House, and the Royal Botanic Garden.'
        }
    ];

    useEffect(() => {
        setTimeout(() => {
            setTrips(mockTrips);
        }, 0);
    }, []);

    return (
        <TableContainer component={Paper} sx={{
            background: 'white',
            minHeight: '50vh',
            borderRadius: '10px',
            color: '#1b2a07',
            width: 'calc(100% - 32px)',
            maxWidth: '100%',
            textAlign: 'left'
        }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Request</TableCell>
                        <TableCell>Plan</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trips.map((trip, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {trip.request}
                            </TableCell>
                            <TableCell>{trip.plan}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default History;
