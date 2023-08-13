import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios, AxiosError } from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts/?_limit=10";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type InitialState = {
  posts: Post[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
};

const initialState: InitialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(POST_URL);
    return response.data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
  },
});

export const selectAllPosts = (state: { posts: InitialState }) => state.posts.posts;
export const getPostStatus = (state: { posts: InitialState }) => state.posts.status;
export const getPostError = (state: { posts: InitialState }) => state.posts.error;

export const postReducer = postSlice.reducer;
export type { AsyncThunkAction } from '@reduxjs/toolkit';
