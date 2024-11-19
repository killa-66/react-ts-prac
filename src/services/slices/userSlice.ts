import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: {
    name: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: UserState['user'] }>) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
    },
    updateUser(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
