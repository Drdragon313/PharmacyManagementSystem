import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportID: "",
};

const ReportSlice = createSlice({
  name: "Report",
  initialState,
  reducers: {
    addReportID: (state, action) => {
      state.reportID = action.payload;
    },
    removeReportID: (state) => {
      state.reportID = "";
    },
  },
});

export const { addReportID, removeReportID } = ReportSlice.actions;
export default ReportSlice.reducer;
