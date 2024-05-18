import { Link as RouterLink } from 'react-router-dom';
import { Button } from "@mui/material";
import React from 'react';

import { getHistoryAsync } from "../features/chat/chatSlice";

// @ts-ignore
function NavigationBar({ dispatch, style }) {
    return (
        <nav>
            <Button
                component={RouterLink}
                to="/newtrip"
                style={{ ...style, marginRight: 20, color: 'white', border: '1px solid #cfcfcf' }}
            >
                Chat
            </Button>
            <Button
                component={RouterLink}
                to="/recenttrips"
                style={{ ...style, color: 'white', border: '1px solid #cfcfcf' }}
                onClick={() => dispatch(getHistoryAsync())}
            >
                Recent Trips
            </Button>
        </nav>
    );
}

export default NavigationBar;