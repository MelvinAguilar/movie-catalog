import { RootState } from "@/store/ReduxStore";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 0,
    username: "",
    avatar: { tmdb: { avatar: { avatar_path: "" } } },
  },
  isAuthenticated: false,
  sessionId: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem("session_id") || "";

      localStorage.setItem("accountId", action.payload.id);
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.user;
