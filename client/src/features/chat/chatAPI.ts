import connector from "../../api/connector";
import {ChatRequest} from "./chatSlice";

export function sendMessage(chatRequest: ChatRequest) {
    return connector.post(
        `${process.env.REACT_APP_BASE_URL}/api/trips`,
        {...chatRequest}
    );
}

export function resetChat(session_id: string) {
    return connector.post(
        `${process.env.REACT_APP_BASE_URL}/api/chat/reset`,
        {session_id: session_id}
    );
}
