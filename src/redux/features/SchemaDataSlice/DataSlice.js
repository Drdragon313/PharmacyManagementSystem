import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    removeData: (state, action) => {
      const idToRemove = action.payload;
      state.data = state.data.filter((item) => item.id !== idToRemove);
    },
    updateData: (state, action) => {
      const updatedData = action.payload;
      const indexToUpdate = state.data.findIndex(
        (item) => item.id === updatedData.id
      );
      if (indexToUpdate !== -1) {
        state.data[indexToUpdate] = updatedData;
      }
    },
    updateDataOrder: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addData, removeData, updateData, updateDataOrder } =
  dataSlice.actions;
export default dataSlice.reducer;
