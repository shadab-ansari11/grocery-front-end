import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: "",
  isLoggedIn: false,
  role: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredential: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = "";
      state.isLoggedIn = false;
      state.role = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUserCredential, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
