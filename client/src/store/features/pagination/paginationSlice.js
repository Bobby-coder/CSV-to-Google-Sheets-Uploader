import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 10,
};

export const paginationSlice = createSlice({
  name: "paginationSlice",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },

    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setPage, setLimit } = paginationSlice.actions;

export default paginationSlice.reducer;
