import {ChatRequest} from "../../types/global.types";
import connector from "../../api/connector";

export function sendMessage(chatRequest: ChatRequest) {
    return connector.post(
        `${process.env.REACT_APP_BASE_URL}/api/trips`,
        {...chatRequest}
    );
}

export function getHistory() {
    return connector.get(
        `${process.env.REACT_APP_BASE_URL}/api/trips/history`,
    );
}