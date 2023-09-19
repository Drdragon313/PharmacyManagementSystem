// schemaSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schemaDataArray: [],
};

const schemaSlice = createSlice({
  name: "schema",
  initialState,
  reducers: {
    addSchemaData: (state, action) => {
      state.schemaDataArray.push(action.payload);
      console.log("Schema Added:", state.schemaDataArray); 
    },
    removeSchemaData: (state, action) => {
      const indexToRemove = action.payload;
      state.schemaDataArray.splice(indexToRemove, 1);
    },
  },
});

export const { addSchemaData, removeSchemaData } = schemaSlice.actions;
export default schemaSlice.reducer;
