import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formDataArray: [],
};

let rowId = 1;

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      const newFormData = { ...action.payload, id: rowId++ };
      state.formDataArray.push(newFormData);
    },
    removeFormData: (state, action) => {
      const idToRemove = action.payload;
      state.formDataArray = state.formDataArray.filter(
        (item) => item.id !== idToRemove
      );
    },
    updateFormDataOrder: (state, action) => {
      // Update the order of formDataArray based on the action.payload
      state.formDataArray = action.payload;
    },
  },
});

export const { addFormData, removeFormData,updateFormDataOrder } = formSlice.actions;
export default formSlice.reducer;
