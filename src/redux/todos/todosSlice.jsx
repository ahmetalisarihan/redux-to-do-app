import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: "1",
        title: "npm",
        completed: true,
      },
      {
        id: "2",
        title: "yarn",
        completed: false
      },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
        state.items.push(action.payload);
    },
  },
});
export const {addTodo} = todosSlice.actions;
export default todosSlice.reducer;