import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todos";

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default store;
