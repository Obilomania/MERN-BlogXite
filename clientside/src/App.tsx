import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import PostDetail from "./pages/PostDetail/PostDetail";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import axios from "axios";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { User_Loggedin } from "./redux/features/auth/userAuthSlice";
import { loginStatus } from "./redux/features/auth/authService";
import Profile from "./pages/Authentication/Profile";
import EditProfile from "./pages/Authentication/EditProfile";
import ChangePassword from "./pages/Authentication/ChangePassword";
import Admin from "./pages/Admin/Admin";
import EditPost from "./pages/Admin/EditPost";
import NotFound from "./pages/NotFound";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function signStatus() {
      const status = await loginStatus();
      dispatch(User_Loggedin(status));
    }
    signStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
          
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />

        {/* Authentication */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateuser" element={<EditProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />

        {/* Admin Page */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/editpost/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
