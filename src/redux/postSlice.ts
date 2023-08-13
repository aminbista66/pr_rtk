import { createSlice } from "@reduxjs/toolkit";


const POST_URL = "https://jsonplaceholder.typicode.com/posts";

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

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const postReducer = postSlice.reducer;
