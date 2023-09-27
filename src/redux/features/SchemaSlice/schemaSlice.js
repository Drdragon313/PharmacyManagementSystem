import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schemaDataArray: [],
  schemaName: "",
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
    updateSchemaName: (state, action) => {
      state.schemaName = action.payload;
    },
  },
});

export const { addSchemaData, removeSchemaData, updateSchemaName } =
  schemaSlice.actions;
export default schemaSlice.reducer;
