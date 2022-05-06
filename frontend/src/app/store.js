import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modals/modalSlice";
import authReducer from "../features/auth/authSlice";
import snippetReducer from "../features/snippets/snippetSlice";
import userReducer from "../features/users/userSlice";
import currentUserSlice from "../features/currentUser/currentUserSlice";
import searchReducer from "../features/search/searchSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    snippet: snippetReducer,
    user: userReducer,
    currentUser: currentUserSlice,
    searchResults: searchReducer,
  },
});
