import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHistory, resetChat, sendMessage } from "./chatAPI";
import { RootState } from "../../core/store";

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

const initialState: ChatState = {
    chatHistory: [],
    history: [],
    sessionId: "",
    status: "idle",
};

export const sendMessageAsync = createAsyncThunk(
    "data/sendMessage",
    async (chatRequest: ChatRequest) => {
        const response = await sendMessage(chatRequest);
        return response.data;
    }
);

export const getHistoryAsync = createAsyncThunk(
    "data/getHistory",
    async () => {
        const response = await getHistory();
        return response.data;
    }
);

export const resetChatAsync = createAsyncThunk(
    "data/resetChat",
    async (session_id: string) => {
        const response = await resetChat(session_id);
        return response.data;
    }
);

export const chatSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        reset: (state) => {
            state.chatHistory = [];
            state.history = [];
            state.sessionId = "";
            state.status = "idle";
        },
        addUserMessage: (state, action) => {
            state.chatHistory.push({
                speaker: 'user',
                message: action.payload
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(sendMessageAsync.rejected, (state, action) => {
                state.status = "failed";
                if (action.error.message?.includes('403')) {
                    state.chatHistory.push({
                    speaker: 'AI',
                    message: "Your recent input has been flagged as an attempt to alter standard chatbot operations. " +
                        "Please be aware that continued misuse of the service can lead to restrictions on your access. " +
                        "We take the integrity and security of our services seriously. " +
                        "If you believe this is a mistake, please contact support."
                });
            }
            })
            .addCase(sendMessageAsync.fulfilled, (state, action) => {
                state.status = "idle";
                const {content} = action.payload;
                state.chatHistory.push({
                    speaker: 'AI',
                    message: content
                });
            })
            .addCase(resetChatAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(resetChatAsync.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(resetChatAsync.fulfilled, (state) => {
                state.chatHistory = [];
                state.history = [];
                state.status = "idle";
            })
            .addCase(getHistoryAsync.fulfilled, (state, action) => {
                state.history = action.payload.map((item: any) => ({
                    request: item.request,
                    plan: item.plan
                }));
            })
    }
});

export const {
    reset,
    addUserMessage
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.data;

export default chatSlice.reducer;
