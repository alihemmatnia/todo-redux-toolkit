import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: [],
  isEdit: false,
  text: "",
  id: "",
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: uuidv4(),
        text: action.payload,
        date: new Date().getTime(),
        isDone: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    getById: (state, action) => {
      let { id, text } = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      state.text = text;
      state.id = id;
      state.isEdit = true;
    },
    editTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
      state.text = "";
      state.id = "";
      state.isEdit = false;
    },
    cancelEditTodo: (state, action) => {
      state.text = "";
      state.id = "";
      state.isEdit = false;
    },
    doneTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, isDone: true } : todo
      );
    },
  },
});
export const {
  addTodo,
  removeTodo,
  getById,
  doneTodo,
  editTodo,
  cancelEditTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
