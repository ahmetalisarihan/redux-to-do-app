import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from 'axios'

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios("http://localhost:7000/todos");
    return res.data;
  }
);
export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data)=> {
  const res = await axios.post('http://localhost:7000/todos', data);
  return res.data;
})

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
    addNewTodoIsLoading: false,
    addNewTodoError: null,
  },
  reducers: {
    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
    chanceActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: {
    // Get Todos
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading= true;
    },
    [getTodosAsync.fulfilled]: (state,action) => {
      state.items = action.payload;
      state.isLoading= false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // Add Todos
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodoIsLoading= true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoIsLoading= false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.addNewTodoIsLoading = false;
      state.error = action.error.message;
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};
export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { toggle, destroy, chanceActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
