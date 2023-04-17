import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.auth = action.payload;
    },
    clearUser: (state) => {
      state.auth = {}
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
