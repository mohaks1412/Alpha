// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  needsPhone: null,
  loading: true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.needsPhone = action.payload.needsPhone;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.needsPhone = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
