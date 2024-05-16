import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import { useAppSelector } from "../core/hooks";
import { selectChat } from "../features/chat/chatSlice";
import PersonIcon from '@mui/icons-material/Person';

const ChatBox = () => {
    const data = useAppSelector(selectChat);
    const { chatHistory, status } = data;

    return (
        <Stack sx={{
            background: '#212121',
            minHeight: '50vh',
            borderRadius: '10px',
            m: 2,
            color: 'white',
            border: '1px solid white', // Adding a white border to the Stack
        }}>
            <List sx={{
                width: '100%',
                maxWidth: '100%',
                bgcolor: '#212121',
                textAlign: 'left',

            }}>
                {
                    chatHistory.map((msg, index) => (
                        <ListItem key={index}
                            sx={{
                                textAlign: 'left',
                                alignItems: 'flex-start',

                            }} className={(index % 2 === 0) ? 'even' : 'odd'}>
                            <ListItemAvatar>
                                {msg.speaker === 'AI' ?
                                    <Avatar sx={{ bgcolor: '#212121' }}></Avatar> :
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                }
                            </ListItemAvatar>
                            <ListItemText primary={msg.message} />
                        </ListItem>
                    ))
                }
                {
                    status === 'loading' &&
                    <ListItem key={546456} sx={{ margin: '8px 28px' }}>
                        <div className="typing-loader"></div>
                    </ListItem>
                }
            </List>
        </Stack>
    );
}

export default ChatBox;
