import { configureStore } from "@reduxjs/toolkit";
import { authSlice, editPostSlice, preferenceSlice } from "../features";

const store = configureStore({
  reducer: {
    auth: authSlice,
    preference: preferenceSlice,
    editPost: editPostSlice,
  },
});

export default store;
