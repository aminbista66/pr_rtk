import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
    }),
    addTodo: builder.mutation({
      query: (todo) => {
        return {
          url: "/todos",
          method: "POST",
          body: todo,
        };
      },
    }),
    updateTodo: builder.mutation({
      query: (todo) => {
        return {
          url: `/todos/${todo.id}`,
          method: "PATCH",
          body: todo,
        };
      },
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/todos/${id}`,
          method: "DELETE",
          body: id,
        };
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
