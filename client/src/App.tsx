import './App.css';
import {Box, Button, Stack} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {ChatRequest, sendMessageAsync, addUserMessage, resetChatAsync} from "./features/chat/chatSlice";
import {useAppDispatch} from "./core/hooks";
import TextAreaElement from "./components/textarea";
import ChatBox from './components/ChatBox';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function App({session_id}: {session_id: string}) {

    const dispatch = useAppDispatch();
    let msg = ''

    const sendMessage = (inputMessage: string) => {
        const msg: ChatRequest = {
            input_message: inputMessage,
            session_id: session_id
        }
        dispatch(sendMessageAsync(msg));
    };

    return (
        <div className="App">
            <header className="App-header">

            </header>
            <main className="App-main">
                <Box sx={{width: '90%'}} className="chat-box">
                    <ChatBox />
                </Box>

                <Box sx={{width: '100%'}} className="chat-controls">
                    <Stack direction="row" spacing={2} className="controlsWrapper">

                        <TextAreaElement onChange={(e:any) => msg = e.target.value}/>
                        <Button variant="contained"
                                endIcon={<SendIcon sx={{transform: 'scaleX(-1)', marginRight: '15px'}}/>}
                                sx={{maxHeight: '35px', margin: 'auto 25px auto 10px !important'}}
                                onClick={(e: any) => {
                                    if (msg) {
                                        dispatch(addUserMessage(msg));
                                        sendMessage(msg);
                                    }
                                }}
                        >
                            send
                        </Button>
                        <Button variant="outlined" endIcon={<RestartAltIcon sx={{transform: 'scaleX(-1)', marginRight: '15px'}} />}
                        sx={{color: 'white', direction: 'rtl', border: '1px solid #cfcfcf'}}
                        onClick={(e: any) => {
                            dispatch(resetChatAsync(session_id))
                        }}
                        >
                            reset
                        </Button>
                    </Stack>
                </Box>

            </main>
            <footer className="App-footer">
                Powered by Dofinity
            </footer>
        </div>
    );
}

export default App;
