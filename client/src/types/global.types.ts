
export interface ChatRequest {
    prompt: string;
    session_id: string;
}

export interface ChatMessage {
    speaker: string;
    message: string;
}

export interface TripMessage {
    request: string;
    plan: string;
}

export interface ChatState {
    chatHistory: ChatMessage[];
    history: TripMessage[];
    sessionId: string;
    status: "idle" | "loading" | "failed";
}

export const initialState: ChatState = {
    chatHistory: [],
    history: [],
    sessionId: "",
    status: "idle",
};