import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/server";

type authState = {
  auth: User | null;
};

const initialState: authState = {
  auth: null,
};

export default createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      state.auth = action.payload;
    },
    clearAuth: (state) => {
      state.auth = null;
    },
  },
});
