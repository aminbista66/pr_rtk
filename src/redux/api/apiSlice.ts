import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: (todo) => {
        return {
          url: "/todos",
          method: "POST",
          body: todo,
        };
      },
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => {
        return {
          url: `/todos/${todo.id}`,
          method: "PATCH",
          body: todo,
        };
      },
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/todos/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
