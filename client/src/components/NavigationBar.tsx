import React from 'react';
import { Button } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { getHistoryAsync } from "../features/chat/chatSlice";

function NavigationBar({ dispatch}: any) {
    return (
        <nav>
            <Button component={RouterLink} to="/newtrip" style={{ marginRight: 20, color: 'white', border: '1px solid #cfcfcf' }}>
                Chat
            </Button>
            <Button component={RouterLink} to="/recenttrips" style={{ color: 'white', border: '1px solid #cfcfcf' }}
                onClick={() => dispatch(getHistoryAsync())}
            >
                Recent Trips
            </Button>
        </nav>
    );
}

export default NavigationBar;
