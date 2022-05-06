import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../users/userService";
import currentUserService from "./currentUserService";

const initialState = {
  followers: [],
  following: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const savedProfilePic = createAsyncThunk(
  "currentUser/savedProfilePic",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await currentUserService.savedProfilePic(token);
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

export const getFollowers = createAsyncThunk(
  "currentUser/getFollowers",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await currentUserService.getFollowers(token);
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

export const getFollowing = createAsyncThunk(
  "currentUser/getFollowing",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await currentUserService.getFollowing(token);
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

export const addToFollowing = createAsyncThunk(
  "currentUser/addToFollowing",
  async (userIDtoFollow, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userID = thunkAPI.getState().auth.user._id;
      return await currentUserService.addToFollowing(
        token,
        userID,
        userIDtoFollow
      );
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
export const removeToFollowing = createAsyncThunk(
  "currentUser/removeToFollowing",
  async (userIDtoRemove, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userID = thunkAPI.getState().auth.user._id;
      return await currentUserService.removeToFollowing(
        token,
        userID,
        userIDtoRemove
      );
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

export const currentUserSlice = createSlice({
  name: "currentUserSlice",
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
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
      })
      .addCase(addToFollowing.fulfilled, (state, action) => {
        state.following.push(action.payload);
      })
      .addCase(removeToFollowing.fulfilled, (state, action) => {
        const followingIDS = state.following.map((user) => user._id);
        const index = followingIDS.indexOf(action.payload);
        state.following.splice(index, 1);
      });
  },
});

export const { reset } = currentUserSlice.actions;
export default currentUserSlice.reducer;
