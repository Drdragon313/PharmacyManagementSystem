import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formDataArray: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action) => {
      state.formDataArray.push(action.payload);
    },
    removeFormData: (state, action) => {
        state.formDataArray = state.formDataArray.filter((item) => item.index !== action.payload);
      },
      updateSelectedOptions: (state, action) => {
        state.selectedOptions = action.payload;
      },
  },
});

export const { addFormData,removeFormData,updateSelectedOptions } = formSlice.actions;
export default formSlice.reducer;
