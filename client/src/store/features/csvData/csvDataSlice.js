import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  headers: [],
  records: [],
  status: "idle", // 'idle' | 'loading' | 'successfull' | 'failed'
  error: null,
};

export const fetchCSVData = createAsyncThunk(
  "csvData/fetch",
  async function (csvURL) {
    const res = await axios.get(
      `http://localhost:8000/api/v1/csv/?url=${csvURL}`
    );

    const csvData = res.data.csvData;

    // Extract headers from data
    let headers = Object.keys(csvData[0]);

    // extract all rows from data
    let records = csvData.map((currRecord) => {
      return Object.values(currRecord);
    });

    return { headers, records };
  }
);

export const csvDataSlice = createSlice({
  name: "csvData",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCSVData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCSVData.fulfilled, (state, action) => {
        state.status = "successfull";
        state.headers = action.payload.headers;
        state.records = action.payload.records;
      })
      .addCase(fetchCSVData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default csvDataSlice.reducer;
