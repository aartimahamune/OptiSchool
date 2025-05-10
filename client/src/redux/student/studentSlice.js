import { createSlice } from "@reduxjs/toolkit";

const studentInitialState = {
  currentStudent: null,
  error: null,
  loading: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState: studentInitialState,
  reducers: {
    setCurrentStudent(state, action) {
      state.currentStudent = action.payload; // Set the student object
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    studentSigninStart(state) {
      state.loading = true;
    },
    studentSigninSuccess(state, action) {
      state.currentStudent = action.payload; // Update the correct property
      state.loading = false;
      state.error = null;
    },
    studentSigninFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStudentStart: (state) => {
      state.loading = true;
    },
    deleteStudentSuccess: (state) => {
      (state.currentStudent = null),
        (state.loading = false),
        (state.error = null);
    },
    deleteStudentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    studentSignoutStart: (state) => {
      state.loading = true;
    },
    studentSignoutSuccess: (state) => {
      state.currentStudent = null;
      state.loading = false;
      state.error = null;
    },
    studentSignoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCurrentStudent,
  setError,
  setLoading,
  studentSigninFailure,
  studentSigninStart,
  studentSigninSuccess,
  deleteStudentFailure,
  deleteStudentStart,
  deleteStudentSuccess,
  studentSignoutStart,
  studentSignoutFailure,
  studentSignoutSuccess
} = studentSlice.actions;

export default studentSlice.reducer;
