import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isGenerateAnalyzeClick: false,
  streamData: ""
};

const motionSlice = createSlice({
  name: "motion",
  initialState,
  reducers: {
    setIsGenerateAnalyzeClick: (state) => {
      state.isGenerateAnalyzeClick = !state.isGenerateAnalyzeClick;
    },
    setStreamData: (state, action: PayloadAction<string>) => {
      state.streamData = action.payload;
    }
  }
});

export default motionSlice.reducer;
export const { setIsGenerateAnalyzeClick, setStreamData } = motionSlice.actions;