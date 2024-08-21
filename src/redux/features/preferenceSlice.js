import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "",
  searchCategory: "photos",
  isCreatePostModalOpen: false,
  featuredTopic: "",
};

const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload.selectedTheme;
    },
    updateSearchCategory: (state, action) => {
      state.searchCategory = action.payload.searchCategory;
    },
    updateIsCreatePostModalOpen: (state, action) => {
      state.isCreatePostModalOpen = action.payload.isCreatePostModalOpen;
    },
    updateFeaturedTopic: (state, action) => {
      state.featuredTopic = action.payload.featuredTopic;
    },
  },
});

export const {
  updateTheme,
  updateSearchCategory,
  updateIsCreatePostModalOpen,
  updateFeaturedTopic,
} = preferenceSlice.actions;

export default preferenceSlice.reducer;
