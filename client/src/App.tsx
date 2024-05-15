import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Button, Stack } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useAppDispatch } from "./core/hooks";
import TextAreaElement from "./components/textarea";
import ChatBox from './components/ChatBox';
import History from './components/History';
import {sendMessageAsync, addUserMessage, resetChatAsync, getHistoryAsync} from "./features/chat/chatSlice";
import { Link as RouterLink } from 'react-router-dom';
import {getHistory} from "./features/chat/chatAPI"; // Import RouterLink

function App({ session_id }: { session_id: string }) {
    const dispatch = useAppDispatch();
    let msg = '';

    const sendMessage = (inputMessage: string) => {
        const msg = {
            prompt: inputMessage,
            session_id
        };
        dispatch(sendMessageAsync(msg));
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav>
                        <Button component={RouterLink} to="/" style={{ marginRight: 20, color: 'white', border: '1px solid #cfcfcf' }}>
                            Chat
                        </Button>
                        <Button component={RouterLink} to="/recenttrips" style={{ color: 'white', border: '1px solid #cfcfcf' }}
                        onClick={() => {
                            dispatch(getHistoryAsync())
                        }}
                        >
                            Recent Trips
                        </Button>
                    </nav>
                </header>
                <main className="App-main">
                    <Routes>
                        <Route path="/" element={
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ width: '100%' }} className="chat-box">
                                    <ChatBox />
                                </Box>
                                <Box sx={{ width: '100%' }} className="chat-controls">
                                    <Stack direction="row" spacing={2} className="controlsWrapper">
                                        <TextAreaElement onChange={(e: any) => msg = e.target.value} />
                                        <Button variant="outlined" endIcon={<SendIcon sx={{  marginLeft: '15px' }} />} sx={{  color: 'white', border: '1px solid #cfcfcf' }}
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
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        } />
                        <Route path="/recenttrips" element={<History/>} />
                    </Routes>
                </main>
                <footer className="App-footer">
                    Powered by Rahav Ayalon
                </footer>
            </div>
        </Router>
    );
}

export default App;
