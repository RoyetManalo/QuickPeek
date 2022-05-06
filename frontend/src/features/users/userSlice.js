import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import snippetsService from "../snippets/snippetsService";
import userService from "./userService";

const initialState = {
  userInfo: null,
  userSnippets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.searchUser(query, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getUserInfo(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserSnippets = createAsyncThunk(
  "user/getUserSnippets",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.getUserSnippets(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userInfo = null;
        state.message = action.payload;
      })
      .addCase(getUserSnippets.fulfilled, (state, action) => {
        state.userSnippets = action.payload;
        console.log(action.payload);
      })
      .addCase(getUserSnippets.rejected, (state, action) => {
        state.isError = true;
        state.userSnippets = [];
        state.message = action.payload;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
