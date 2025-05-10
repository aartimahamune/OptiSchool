import { createSlice } from "@reduxjs/toolkit";

const adminInitialState = {
  currentAdmin: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: adminInitialState,
  reducers: {
    adminSigninStart: (state) => {
      state.loading = true;
    },
    adminSigninSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    adminSigninFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteAdminStart: (state) => {
      state.loading = true;
    },
    deleteAdminSuccess: (state) => {
      (state.currentAdmin = null),
        (state.loading = false),
        (state.error = null);
    },
    deleteAdminFailure: (action, state) => {
      (state.error = action.payload), (state.loading = false);
    },

    adminSignoutStart: (state) => {
      state.loading = true;
    },
    adminSignoutSuccess: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = null;
    },
    adminSignoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  adminSigninStart,
  adminSigninSuccess,
  adminSigninFailure,
  deleteAdminFailure,
  deleteAdminStart,
  deleteAdminSuccess,
  adminSignoutStart,
  adminSignoutSuccess,
  adminSignoutFailure
} = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
