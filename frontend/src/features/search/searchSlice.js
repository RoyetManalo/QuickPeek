import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import snippetsService from "../snippets/snippetsService";
import userService from "../users/userService";
const initialState = {
  snippets: [],
  users: [],
};

export const searchUser = createAsyncThunk(
  "search/User",
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

export const searchSnippet = createAsyncThunk(
  "search/Snippet",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.searchSnippet(query, token);
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

export const searchSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.snippets = [];
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.length > 0) {
          if (action.payload[0].hasOwnProperty("user")) {
            state.snippets = action.payload;
          } else {
            state.users = action.payload;
          }
        }
      })
      .addCase(searchSnippet.fulfilled, (state, action) => {
        const payload =
          action.payload.length > 0
            ? action.payload[0].snippet
              ? action.payload[0].snippet
              : action.payload
            : [];
        if (payload) {
          const hasProperty = (data) => data.hasOwnProperty("user");
          console.log(payload.some(hasProperty));

          if (payload.some(hasProperty)) {
            state.snippets = payload;
          } else {
            state.users = payload;
          }
        }
      });
  },
});

export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
