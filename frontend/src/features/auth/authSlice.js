import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import userService from "../users/userService";
import snippetsService from "../snippets/snippetsService";

// Get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      console.log(user);
      return await authService.register(user);
    } catch (error) {
      // review
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

// Login User
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
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

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// move to currentUser Slice
// export const addToFollowing = createAsyncThunk(
//   "user/addToFollowing",
//   async (userIDtoFollow, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       const userID = thunkAPI.getState().auth.user._id;
//       return await userService.addToFollowing(token, userID, userIDtoFollow);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// export const removeToFollowing = createAsyncThunk(
//   "user/removeToFOllowing",
//   async (userIDtoRemove, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       const userID = thunkAPI.getState().auth.user._id;
//       return await userService.removeToFollowing(token, userID, userIDtoRemove);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const addToSavedSnippets = createAsyncThunk(
//   "user/addToSavedSnippets",
//   async (snippetIDToSaved, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       const userID = thunkAPI.getState().auth.user._id;
//       return await userService.addToSavedSnippets(
//         token,
//         userID,
//         snippetIDToSaved
//       );
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const removeToSavedSnippets = createAsyncThunk(
//   "user/removeToSavedSnippets",
//   async (snippetIDToRemove, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       const userID = thunkAPI.getState().auth.user._id;
//       return await userService.removeToSavedSnippets(
//         token,
//         userID,
//         snippetIDToRemove
//       );
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const addStar = createAsyncThunk(
//   "user/addStar",
//   async (snippetID, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       console.log(token);
//       return await snippetsService.addStar(snippetID, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const unStar = createAsyncThunk(
//   "user/unStar",
//   async (snippetID, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       console.log(token);
//       return await snippetsService.unStar(snippetID, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "authSlice",
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.user = null;
      });
    // .addCase(addToFollowing.fulfilled, (state, action) => {
    //   state.user.following.push(action.payload);
    // })
    // .addCase(removeToFollowing.fulfilled, (state, action) => {
    //   const index = state.user.following.indexOf(action.payload);
    //   state.user.following.splice(index, 1);
    // });
    // .addCase(addToSavedSnippets.fulfilled, (state, action) => {
    //   state.user.savedSnippets.push(action.payload);
    // })
    // .addCase(removeToSavedSnippets.fulfilled, (state, action) => {
    //   const index = state.user.savedSnippets
    //     .map((snippet) => snippet._id)
    //     .indexOf(action.payload);
    //   state.user.savedSnippets.splice(index, 1);
    //   console.log(index);
    //   console.log(action.payload);
    // });
    // .addCase(addStar.fulfilled, (state, action) => {
    //   state.user.starredSnippets.push(action.payload);
    // })
    // .addCase(unStar.fulfilled, (state, action) => {
    //   const index = state.user.starredSnippets
    //     .map((snippet) => snippet._id)
    //     .indexOf(action.payload);
    //   state.user.starredSnippets.splice(index, 1);
    // });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
