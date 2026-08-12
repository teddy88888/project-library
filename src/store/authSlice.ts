import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

type AuthState = { token: string | null; user: User | null };

const stored = localStorage.getItem("booky-auth");
const initialState: AuthState = stored ? JSON.parse(stored) : { token: null, user: null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("booky-auth", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("booky-auth");
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("booky-auth", JSON.stringify({ token: state.token, user: action.payload }));
    },
  },
});

export const { setAuth, logout, updateUser } = slice.actions;
export default slice.reducer;