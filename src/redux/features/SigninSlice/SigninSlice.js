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
  },
});

export const { addSigninData } = SigninSlice.actions;
export default SigninSlice.reducer;
