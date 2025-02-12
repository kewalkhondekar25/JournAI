import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counterSlice"
import journalReducer from "./features/journalSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    journal: journalReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

