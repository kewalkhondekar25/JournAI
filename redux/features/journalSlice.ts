import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JournalData {
  id: string | null;
  title: string | null;
  paragraph: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

interface StateType {
  isNewJournalId: string | null
  todaysJournal: JournalData
};

const initialState: StateType = {
  isNewJournalId: null,
  todaysJournal: {
    id: null,
    title: null,
    paragraph: null,
    createdAt: null,
    updatedAt: null
  }
}

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setIsNewJournalId: (state, action: PayloadAction<string | null>) => {
      state.isNewJournalId = action.payload;
    },
    setTodaysJournal: (state, action: PayloadAction<JournalData>) => {
      state.todaysJournal = { ...state.todaysJournal, ...action.payload };
    }
  }
});

export default journalSlice.reducer;
export const { setIsNewJournalId, setTodaysJournal } = journalSlice.actions;