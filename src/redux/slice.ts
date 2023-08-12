import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  task: string;
  is_completed: boolean;
  created_at: string;
  due_on: string;
};

export const todoSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      state[index].is_completed = !state[index].is_completed;
    },
    deleteTodo: (state, action:PayloadAction<Todo>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      state.splice(index, 1);
    }
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
