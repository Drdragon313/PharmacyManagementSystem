import { createSlice } from "@reduxjs/toolkit";

const pharmaciesSlice = createSlice({
  name: "pharmacies",
  initialState: {
    data: [],
    loading: true,
    page: 1,
    limit: 5,
    totalItems: 0,
    sortField: "rent",
    sortDirection: "asc",
  },
  reducers: {
    setPharmaciesData: (state, action) => {
      state.data = action.payload.data;
      state.totalItems = action.payload.totalItems;
      state.loading = false;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1; // Reset page when changing the limit
    },
    setSort: (state, action) => {
      state.sortField = action.payload.sortField;
      state.sortDirection = action.payload.sortDirection;
    },
    deletePharmacySuccess: (state, action) => {
      const updatedData = state.data.filter(
        (item) => item.id !== action.payload
      );
      state.data = updatedData;
      state.totalItems -= 1;
    },
  },
});

export const {
  setPharmaciesData,
  setPage,
  setLimit,
  setSort,
  deletePharmacySuccess,
} = pharmaciesSlice.actions;

export default pharmaciesSlice.reducer;
