import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
  },
  reducers: {
    openSidebar: (state) => { state.sidebarOpen = true; },
    closeSidebar: (state) => { state.sidebarOpen = false; },
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
  },
});

export const { openSidebar, closeSidebar, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
