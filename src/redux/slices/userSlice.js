import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// -------------------- SERVICE THUNKS --------------------

export const fetchHomeSalons = createAsyncThunk(
  "user/fetchHomeSalons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-home-salons");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch home salons");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    homeSalons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeSalons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeSalons.fulfilled, (state, action) => {
        state.loading = false;
        state.homeSalons = action.payload;
      })
      .addCase(fetchHomeSalons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
