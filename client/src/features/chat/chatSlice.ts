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

// New interface for the trip history
export interface TripMessage {
    request: string;
    plan: string;
}

export interface ChatState {
    chatHistory: ChatMessage[];
    history: TripMessage[]; // Now using TripMessage for history
    sessionId: string;
    debugInfo: any;
    status: "idle" | "loading" | "failed";
}

const initialState: ChatState = {
    chatHistory: [],
    history: [], // Initialize the history array for TripMessage
    sessionId: "",
    debugInfo: {},
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
        // Make sure the API response structure matches what you need here
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
            state.history = []; // Reset history as well
            state.sessionId = "";
            state.debugInfo = {};
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
            .addCase(sendMessageAsync.rejected, (state) => {
                state.status = "failed";
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
                state.history = []; // Reset history on chat reset
                state.debugInfo = {};
                state.status = "idle";
            })
            .addCase(getHistoryAsync.fulfilled, (state, action) => {
                // Ensure the payload structure matches TripMessage
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
