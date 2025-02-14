import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counterSlice"
import journalReducer from "./features/journalSlice"
import motionReducer from "./features/motionSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    journal: journalReducer,
    motion: motionReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

