import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: null
};

const SchemaSelection = createSlice({
  name: "index",
  initialState,
  reducers: {
    addIndex: (state, action) => {
      state.index=Number(action.payload);
    },
   
    
  },
});

export const { addIndex } =
  SchemaSelection.actions;
export default SchemaSelection.reducer;
