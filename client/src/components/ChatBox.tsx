import {Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack} from "@mui/material";
import {useAppSelector} from "../core/hooks";
import {selectChat} from "../features/chat/chatSlice";
import PersonIcon from '@mui/icons-material/Person';

const ChatBox = () => {

    const data = useAppSelector(selectChat);
    const {chatHistory, status} = data;

    return (
        <Stack sx={{
            background: 'white',
            minHeight: '50vh',
            borderRadius: '10px',
            m: 2,
            color: '#1b2a07'
        }}>
            <List sx={{
                width: '100%',
                maxWidth: '100%',
                bgcolor: 'background.paper',
                textAlign: 'right'
            }}>

                {
                    chatHistory.map((msg: any, index: number) => {
                        return <ListItem key={index}
                                         sx={{
                                             textAlign: 'right',
                                             alignItems: 'flex-start',
                                         }} className={(index % 2 === 0) ? 'even' : 'odd'}>
                            <ListItemAvatar>
                                {
                                    msg.speaker === 'AI' ?
                                        <Avatar sx={{
                                            bgcolor: '#1b2a07',
                                        }}></Avatar>
                                        :
                                        <Avatar sx={{}}>
                                            <PersonIcon/>
                                        </Avatar>
                                }
                            </ListItemAvatar>
                            <ListItemText primary={msg.message}/>
                        </ListItem>
                    })
                }
                {
                    status === 'loading' &&
                  <ListItem key={546456} sx={{margin: '8px 28px'}}>
                    <div className="typing-loader"></div>
                  </ListItem>
                }
            </List>
        </Stack>
    )
}

export default ChatBox;
