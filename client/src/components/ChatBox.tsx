import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

import { selectChat } from "../features/chat/chatSlice";
import { useAppSelector } from "../core/hooks";

const ChatBox = () => {
    const data = useAppSelector(selectChat);
    const { chatHistory, status } = data;

    return (
        <Stack sx={{
            background: 'black',
            minHeight: '50vh',
            borderRadius: '10px',
            m: 2,
            color: 'white',
            border: '1px solid white',
        }}>
            <List sx={{
                width: '100%',
                maxWidth: '100%',
                bgcolor: 'black',
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
                                    <Avatar sx={{ bgcolor: 'black' }}></Avatar> :
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
