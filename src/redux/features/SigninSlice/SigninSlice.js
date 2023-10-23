import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const SigninSlice = createSlice({
  name: "SiginSlice",
  initialState,
  reducers: {
    addSigninData: (state, action) => {
      state.data.push(action.payload);
    },
    // removeData: (state, action) => {
    //   const idToRemove = action.payload;
    //   state.data = state.data.filter((item) => item.id !== idToRemove);
    // },
    // updateData: (state, action) => {
    //   const updatedData = action.payload;
    //   const indexToUpdate = state.data.findIndex(
    //     (item) => item.id === updatedData.id
    //   );
    //   if (indexToUpdate !== -1) {
    //     state.data[indexToUpdate] = updatedData;
    //   }
    // },
  },
});

export const { addSigninData } = SigninSlice.actions;
export default SigninSlice.reducer;
