import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  post: null,
};

const editPostSlice = createSlice({
  name: "editPost",
  initialState,
  reducers: {
    addPostToBeEdited: (state, action) => {
      state.modalOpen = true;
      state.post = action?.payload?.post;
    },
    removePostToBeEdited: (state) => {
      state.modalOpen = false;
      state.post = null;
    },
  },
});

export const { addPostToBeEdited, removePostToBeEdited } =
  editPostSlice.actions;
export default editPostSlice.reducer;
