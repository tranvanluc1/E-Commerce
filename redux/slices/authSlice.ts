import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { register, login, refreshToken } from "../asyncThunk/auth";
import { RootState } from "../rootState";

// declaring the types for our state
export type userState = {
  email?: string;
  name?: string;
  avatar?: string;
};

export type alertState = {
  loading?: boolean;
  success?: string;
  error?: string;
};
export type AuthState = {
  user: userState;
  token?: string;
  alert: alertState;
};

const initialState: AuthState = {
  user: {},
  alert: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.alert = { loading: action.payload };
    },
    notify: (state, action: PayloadAction<Object>) => {
      state.alert = action.payload;
    },
    resetNotify: (state) => {
      state.alert = {};
    },
    logout: () => {
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("refreshToken");
      return {
        user: {},
        alert: { success: "Logout success!" },
      };
    },
  },
  extraReducers: {
    //register
    [register.pending.toString()]: (state, action) => {
      state.alert.loading = true;
    },
    [register.fulfilled.toString()]: (state, action) => {
      if (action.payload?.status === 200)
        state.alert = { success: action.payload?.msg };
      else state.alert = { error: action.payload?.msg };
    },
    [register.rejected.toString()]: (state, action) => {
      state.alert = { error: action.payload?.msg };
    },
    //login
    [login.pending.toString()]: (state, action) => {
      state.alert.loading = true;
    },
    [login.fulfilled.toString()]: (state, action) => {
      if (action.payload?.status === 200) {
        state.alert = { success: action.payload?.msg };
        state.token = action.payload?.accessToken;
        state.user = action.payload?.user;
        localStorage.setItem("refreshToken", action.payload?.refreshToken);
        localStorage.setItem("firstLogin", JSON.stringify(true));
      } else state.alert = { error: action.payload?.msg };
    },
    [login.rejected.toString()]: (state, action) => {
      state.alert = { error: action.payload?.msg };
    },
    //refreshToken
    [refreshToken.pending.toString()]: (state, action) => {
      state.alert.loading = true;
    },
    [refreshToken.fulfilled.toString()]: (state, action) => {
      console.log(action.payload);
      if (action.payload?.status === 200) {
        state.user = action.payload?.user;
        state.token = action.payload?.accessToken;
        state.alert = {};
      } else {
        state.alert = { error: action.payload?.msg };
        localStorage.removeItem("firstLogin");
      }
    },
    [refreshToken.rejected.toString()]: (state, action) => {
      state.alert = { error: action.payload?.msg };
      localStorage.removeItem("firstLogin");
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { loading, notify, resetNotify, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectNotify = (state: RootState) => state.auth.alert;
export const selectAuth = (state: RootState) => state.auth;
export const selectToken = (state: RootState) => state.auth.token;

// exporting the reducer here, as we need to add this to the store
export default authSlice.reducer;
