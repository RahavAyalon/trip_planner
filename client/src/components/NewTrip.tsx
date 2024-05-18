import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Stack, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

import { addUserMessage, sendMessageAsync } from "../features/chat/chatSlice";
import TextAreaElement from "./textarea";
import ChatBox from './ChatBox';

// @ts-ignore
function NewTrip({ dispatch, session_id }) {
    let msg = '';

    const sendMessage = (inputMessage: string) => {
        const messageData = {
            prompt: inputMessage,
            session_id
        };
        dispatch(sendMessageAsync(messageData));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%' }} className="chat-box">
                <ChatBox />
            </Box>
            <Box sx={{ width: '100%' }} className="chat-controls">
                <Stack direction="row" spacing={2} className="controlsWrapper">
                    <TextAreaElement onChange={(e: { target: { value: string; }; }) => msg = e.target.value} />
                    <Button variant="outlined" endIcon={<SendIcon sx={{ marginLeft: '15px' }} />} sx={{ color: 'white', border: '1px solid #cfcfcf' }}
                        onClick={() => {
                            if (msg) {
                                dispatch(addUserMessage(msg));
                                sendMessage(msg);
                            }
                        }}
                    >
                        Send
                    </Button>
                    <Button variant="outlined" endIcon={<RestartAltIcon sx={{ transform: 'scaleX(-1)', marginLeft: '15px' }} />}
                        sx={{ color: 'white', border: '1px solid #cfcfcf' }}
                        onClick={() => window.location.reload()}
                    >
                        Reset
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default NewTrip;
