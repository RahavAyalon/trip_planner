import connector from "../../api/connector";
import {ChatRequest} from "./chatSlice";

export function sendMessage(chatRequest: ChatRequest) {
    return connector.post(
        `${process.env.REACT_APP_BASE_URL}/api/trips`,
        {...chatRequest},
        { withCredentials: true }
    );
}

export function getHistory() {
    return connector.get(
        `${process.env.REACT_APP_BASE_URL}/api/trips/history`,
        { withCredentials: true }
    );
}
export function resetChat(session_id: string) {
    return connector.post(
        `${process.env.REACT_APP_BASE_URL}/api/trips/reset`,
        {session_id: session_id},
        { withCredentials: true }
    );
}
