import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// -------------------- SERVICE THUNKS --------------------

export const fetchHomeSalonsBySalonCategory = createAsyncThunk(
  "user/fetchHomeSalonsBySalonCategory",
  async ({ category, lat, lng }, { rejectWithValue }) => {
    console.log("Fetching home salons with params:", { category, lat, lng });
    try {
      const response = await axiosInstance.get(`/user/get-home-salons?category=${category}&lat=${lat}&lng=${lng}`);
      console.log("Fetched home salons data:", response.data);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch home salons");
    }
  }
);

export const fetchHomeIndependentprosByCategory = createAsyncThunk(
  "user/fetchHomeIndependentprosByCategory",
  async ({ category, lat, lng }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/get-home-independentpros?category=${category}}&lat=${lat}&lng=${lng}`);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch home independent professionals");
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "user/getAllCategories",
  async (gender, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/get-all-categories?gender=${gender}`);
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
      console.log("Fetched salon details:", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch salon by ID");
    }
  }
);

export const fetchAllSalonsByCategory = createAsyncThunk(
  "user/fetchAllSalons",
  async ({ category, lat, lng }, { rejectWithValue }) => {
    console.log("Fetching all salons with params:", { category, lat, lng });
    try {
      const response = await axiosInstance.get(`/user/get-all-salons-by-category?category=${category}&lat=${lat}&lng=${lng}`);
      return response.data.salons || [];
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch all salons");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    homeSalonsBySalonCategory: [],
    homeIndependentProsByCategory: [],
    allSalonsByCategory: [],
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
      .addCase(fetchHomeIndependentprosByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeIndependentprosByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.homeIndependentProsByCategory = action.payload;
      })
      .addCase(fetchHomeIndependentprosByCategory.rejected, (state, action) => {
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
      })
      .addCase(fetchAllSalonsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSalonsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.allSalonsByCategory = action.payload;
      })
      .addCase(fetchAllSalonsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
