import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formModal: false,
  fullSnippetModal: false,
  editSnippetModal: false,
};

export const modalSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    reset: (state) => {
      state.formModal = false;
      state.fullSnippetModal = false;
    },
    openForm: (state) => {
      state.formModal = true;
    },
    closeForm: (state) => {
      state.formModal = false;
    },
    openFullSnippet: (state) => {
      state.fullSnippetModal = true;
    },
    closeFullSnippet: (state) => {
      state.fullSnippetModal = false;
    },
    openEditSnippet: (state) => {
      state.editSnippetModal = true;
    },
    closeEditSnippet: (state) => {
      state.editSnippetModal = false;
    },
  },
});

export const {
  reset,
  openForm,
  closeForm,
  openFullSnippet,
  closeFullSnippet,
  openEditSnippet,
  closeEditSnippet,
} = modalSlice.actions;
export default modalSlice.reducer;
