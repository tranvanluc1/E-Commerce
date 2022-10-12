import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../utils/fetchData";

export const register = createAsyncThunk(
  "auth/register",
  async (data: Object) => {
    const res = await postData("auth/register", data, "");
    return res;
  }
);

export const login = createAsyncThunk("auth/login", async (data: Object) => {
  const res = await postData("auth/login", data, "");
  return res;
});

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (data: Object) => {
    const res = await postData("auth/refreshToken", data, "");
    return res;
  }
);
