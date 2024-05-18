import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import sequencesReducer from '../features/chat/chatSlice';

export const store = configureStore({
        reducer: {
            data: sequencesReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            })
    }
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
