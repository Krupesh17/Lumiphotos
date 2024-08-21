import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  authData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.authData = action.payload.authData;
    },
    logout: (state) => {
      state.authStatus = false;
      state.authData = {};
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
