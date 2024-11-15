import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "./features/csvData/csvDataSlice.js";
import paginationReducer from "./features/pagination/paginationSlice.js";

export const store = configureStore({
  reducer: {
    csvData: csvDataReducer,
    pagination: paginationReducer,
  },
});
