import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// -------------------- SERVICE THUNKS --------------------

export const fetchHomeSalonsBySalonCategory = createAsyncThunk(
  "user/fetchHomeSalonsBySalonCategory",
  async (category, { rejectWithValue }) => {
    // console.log('Fetching home salons for category:', category);
    try {
      const response = await axiosInstance.get(`/user/get-home-salons?category=${category}`);
      // console.log('Fetched home salons response:', response.data);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch home salons");
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "user/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-all-categories");
      return response.data.categories;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch categories");
    }
  }
);

export const fetchSalonById = createAsyncThunk(
  "user/fetchSalonById",
  async (salonId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/get-salon/${salonId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch salon by ID");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    homeSalonsBySalonCategory: [],
    categories: [],
    salonDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeSalonsBySalonCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeSalonsBySalonCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.homeSalonsBySalonCategory = action.payload;
      })
      .addCase(fetchHomeSalonsBySalonCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSalonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalonById.fulfilled, (state, action) => {
        state.loading = false;
        state.salonDetails = action.payload;
      })
      .addCase(fetchSalonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
