import { createSlice } from '@reduxjs/toolkit';

const initialState = { sidebarOpen: false, theme: 'light' };
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
  },
});
export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;