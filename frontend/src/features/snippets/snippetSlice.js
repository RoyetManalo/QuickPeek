import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import snippetsService from "./snippetsService";
import userService from "../users/userService";

const initialState = {
  feed: [],
  snippets: [],
  snippet: [],
  mySnippets: [],
  savedSnippets: [],
  starredSnippets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getFeed = createAsyncThunk(
  "snippet/getFeed",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.getFeed(token);
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

export const getSnippets = createAsyncThunk(
  "snippet/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.getSnippets(token);
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
export const getSnippet = createAsyncThunk(
  "snippet/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.getSnippet(id, token);
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
export const getStarredSnippets = createAsyncThunk(
  "snippet/getStarred",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.getStarredSnippets(token);
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
export const getSavedSnippets = createAsyncThunk(
  "snippet/getSaved",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.getSavedSnippets(token);
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

export const getMySnippets = createAsyncThunk(
  "snippet/getMySnippets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.getMySnippets(token);
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

export const createSnippet = createAsyncThunk(
  "snippet/create",
  async (snippet, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.addSnippet(snippet, token);
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

export const editSnippet = createAsyncThunk(
  "snippet/edit",
  async (snippet, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(snippet.user);
      console.log(snippet);
      console.log(token);
      return await snippetsService.editSnippet(snippet._id, snippet, token);
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
export const deleteSnippet = createAsyncThunk(
  "snippet/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.deleteSnippet(id, token);
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

export const addToSavedSnippets = createAsyncThunk(
  "snippet/addToSavedSnippets",
  async (snippetIDToSaved, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userID = thunkAPI.getState().auth.user._id;
      return await userService.addToSavedSnippets(
        token,
        userID,
        snippetIDToSaved
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

export const removeToSavedSnippets = createAsyncThunk(
  "snippet/removeToSavedSnippets",
  async (snippetIDToRemove, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userID = thunkAPI.getState().auth.user._id;
      return await userService.removeToSavedSnippets(
        token,
        userID,
        snippetIDToRemove
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

export const searchSnippet = createAsyncThunk(
  "snippet/search",
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

export const addStar = createAsyncThunk(
  "snippet/addStar",
  async (snippetID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.addStar(snippetID, token);
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

export const unStar = createAsyncThunk(
  "snippet/unStar",
  async (snippetID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await snippetsService.unStar(snippetID, token);
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

export const snippetSlice = createSlice({
  name: "snippet",
  initialState,
  reducers: {
    reset: (state) => initialState,
    removeSnippet: (state) => {
      state.snippet = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.feed = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSnippets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.snippets = action.payload;
      })
      .addCase(getSnippets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSnippet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.snippet = action.payload;
      })
      .addCase(getSnippet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStarredSnippets.fulfilled, (state, action) => {
        state.starredSnippets = action.payload;
      })
      .addCase(getSavedSnippets.fulfilled, (state, action) => {
        state.savedSnippets = action.payload;
      })
      .addCase(getMySnippets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMySnippets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mySnippets = action.payload;
      })
      .addCase(getMySnippets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSnippet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSnippet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.feed.unshift(action.payload);
        state.mySnippets.unshift(action.payload);
      })
      .addCase(createSnippet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editSnippet.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(editSnippet.fulfilled, (state, action) => {
        const index = state.mySnippets
          .map((snippet) => snippet._id)
          .indexOf(action.payload._id);
        state.mySnippets.splice(index, 1);
        state.mySnippets.splice(index, 0, action.payload);
        state.snippet.splice(0, 1, action.payload);
      })
      .addCase(deleteSnippet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSnippet.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.mySnippets
          .map((snippet) => snippet._id)
          .indexOf(action.payload.id);
        state.mySnippets.splice(index, 1);
        state.snippet.splice(0, 1);
      })
      .addCase(addToSavedSnippets.fulfilled, (state, action) => {
        state.savedSnippets.push(action.payload);
      })
      .addCase(removeToSavedSnippets.fulfilled, (state, action) => {
        const index = state.savedSnippets
          .map((snippet) => snippet._id)
          .indexOf(action.payload);
        state.savedSnippets.splice(index, 1);
      })
      .addCase(searchSnippet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchSnippet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      })
      .addCase(addStar.fulfilled, (state, action) => {
        const index = state.feed
          .map((snippet) => snippet._id)
          .indexOf(action.payload._id);
        state.feed.splice(index, 1, action.payload);
        state.starredSnippets.push(action.payload);
        state.snippet.splice(0, 1, action.payload);
      })
      .addCase(unStar.fulfilled, (state, action) => {
        const index = state.feed
          .map((snippet) => snippet._id)
          .indexOf(action.payload._id);
        state.feed.splice(index, 1, action.payload);
        const starIndex = state.starredSnippets
          .map((snippet) => snippet._id)
          .indexOf(action.payload._id);
        state.starredSnippets.splice(starIndex, 1);
        state.snippet.splice(0, 1, action.payload);
      });
  },
});

export const { reset, removeSnippet } = snippetSlice.actions;
export default snippetSlice.reducer;
