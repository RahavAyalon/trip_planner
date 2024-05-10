import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {resetChat, sendMessage} from "./chatAPI";
import {RootState} from "../../core/store";


export interface ChatRequest {
    input_message: string;
    session_id: string;
}

export interface ChatMessage {
    speaker: string;
    message: string;
}

export interface ChatState {
    chatHistory: ChatMessage[];
    sessionId: string;
    debugInfo: any;
    status: "idle" | "loading" | "failed";
}

const initialState: ChatState = {
    chatHistory: [],
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
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        reset: (state) => {
            state.chatHistory = [];
            state.sessionId = "";
            state.debugInfo = {};
            state.status = "idle";
        },
        addUserMessage: (state: any, action) => {
            state.chatHistory.push({
                speaker: 'user',
                message: action.payload
            })
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageAsync.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(sendMessageAsync.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(sendMessageAsync.fulfilled, (state, action) => {
                state.status = "idle";
                const {message, debug_info} = action.payload
                state.chatHistory.push({
                    speaker: 'AI',
                    message: message
                });
                state.debugInfo = debug_info;
            })
            .addCase(resetChatAsync.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(resetChatAsync.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(resetChatAsync.fulfilled, (state, action) => {
                state.chatHistory = [];
                state.debugInfo = {};
                state.status = "idle";
            })
    },
});

export const {
    reset,
    addUserMessage
} = chatSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChat = (state: RootState) => state.data;

export default chatSlice.reducer;