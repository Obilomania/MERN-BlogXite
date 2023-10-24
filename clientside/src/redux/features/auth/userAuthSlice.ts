import { createSlice } from "@reduxjs/toolkit";

const name: string | null = JSON.parse(localStorage.getItem("name") || "null");

export const emptyUserState: any = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name:"",
    id: "",
    email: "",
    phone: "",
    admin: false,
  }
};


export const userAuthSlice = createSlice({
  name: "auth",
  initialState: emptyUserState,
  reducers: {
    Set_User: (state, action) => {
      localStorage.setItem("email", JSON.stringify(action.payload));
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.id = profile.id;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
    },
    User_Loggedin: (state, action) => {
      state.isLoggedIn = action.payload
    },
    User_Fullname: (state, action) => {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    }
  },
});


export const { Set_User, User_Loggedin, User_Fullname } = userAuthSlice.actions;
export const selectIsLoggedIn = (state: any) => state.persistedReducer.auth.isLoggedIn
export const selectName = (state: any) => state.persistedReducer.auth.name
export const selectUser = (state: any) => state.persistedReducer.auth.user
export const userAuthReducer = userAuthSlice.reducer;