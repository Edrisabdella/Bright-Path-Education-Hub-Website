import { createSlice } from '@reduxjs/toolkit';

const initialState = { courses: [], currentCourse: null, loading: false };

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => { state.courses = action.payload; },
    setCurrentCourse: (state, action) => { state.currentCourse = action.payload; },
    setLoading: (state, action) => { state.loading = action.payload; },
  },
});

export const { setCourses, setCurrentCourse, setLoading } = courseSlice.actions;
export default courseSlice.reducer;