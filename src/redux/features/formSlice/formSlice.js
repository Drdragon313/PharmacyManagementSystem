import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formDataArray: [],
  id: 1,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      const newFormData = { ...action.payload, id: state.id++ };
      state.formDataArray.push(newFormData);
    },
    removeFormData: (state, action) => {
      const idToRemove = action.payload;
      state.formDataArray = state.formDataArray.filter(
        (item) => item.id !== idToRemove
      );
    },
    updateFormDataOrder: (state, action) => {
      state.formDataArray = action.payload;
    },
    resetFormDataArray: (state) => {
      state.formDataArray = [];
    },
    resetId: (state) => {
      state.id = 1;
    },
  },
});

export const {
  addFormData,
  removeFormData,
  updateFormDataOrder,
  resetFormDataArray,
  resetId,
} = formSlice.actions;

export default formSlice.reducer;
