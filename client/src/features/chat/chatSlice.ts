import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {ChatRequest, initialState} from "../../types/global.types";
import { getHistory, sendMessage } from "./chatAPI";
import { RootState } from "../../core/store";


export const sendMessageAsync = createAsyncThunk(
    "data/sendMessage",
    async (chatRequest: ChatRequest, { rejectWithValue }) => {
        try {
            const response = await sendMessage(chatRequest);
            return response.data;
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.status === 400) {
                // @ts-ignore
                return rejectWithValue(error.response.data);
            } else {
                throw error;
            }
        }
    }
);

export const getHistoryAsync = createAsyncThunk(
    "data/getHistory",
    async () => {
        const response = await getHistory();
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
            .addCase(sendMessageAsync.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(sendMessageAsync.rejected, (state, action) => {
                state.status = "failed";
                if (action.payload) {
                    state.chatHistory.push({
                        speaker: 'AI',                     // @ts-ignore
                        message: action.payload.detail
                    });
                } else if (action.error.message?.includes('403')) {
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
            .addCase(getHistoryAsync.fulfilled, (state, action) => {
                state.history = action.payload.map((item: any) => ({
                    request: item.request,
                    plan: item.plan
                }));
            })
    }
});

export const {
    addUserMessage
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.data;

export default chatSlice.reducer;
