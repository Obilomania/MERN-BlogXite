import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User_Loggedin } from "../redux/features/auth/userAuthSlice";
import { loginStatus } from "../redux/features/auth/authService";
import toastNotify from "../Helpers/toastNotify";

const useRedirectLoggedOutUser = (path: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await loginStatus();
      dispatch(User_Loggedin(isLoggedIn));

      if (!isLoggedIn) {
        toastNotify("Session Expired, Please Login in to continue", "info");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
