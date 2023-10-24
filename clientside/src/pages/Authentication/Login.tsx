import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toastNotify from "../../Helpers/toastNotify";
import { useDispatch } from "react-redux";
import {
  Set_User,
  User_Loggedin,
} from "../../redux/features/auth/userAuthSlice";
import userModel from "../../interfaces/userModel";
import {
  loginUser,
  validateEmail,
} from "../../redux/features/auth/authService";
import { User_Fullname } from "../../redux/features/auth/userAuthSlice";
import Loading from "../../components/Loading";

const Login = () => {
  // const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const reveal = () => {
    setRevealPassword(!revealPassword);
  };

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.email || !userInput.password) {
      toastNotify("Please, Fill all inputs", "error");
    }
    if (!validateEmail(userInput.email)) {
      return toastNotify("Please enter a valid email", "error");
    }
    setIsLoading(true);
    try {
      const userData: any = await loginUser({
        email: userInput.email,
        password: userInput.password,
      });
      await dispatch(User_Loggedin(true));
      await dispatch(User_Fullname(userData.name));
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <LoginPage className="container mx-auto px-5 py-10">
        {isLoading && <Loading />}
        <div className="login w-full max-w-sm mx-auto mt-20">
          <h1 className="heading text-2xl font-bold text-center text-dark-hard mb-8">
            Sign In
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6 w-full">
              <input
                type="text"
                id="email"
                placeholder="Email Address"
                className="placeholder:text-[#959ead] text-dark mt-2 text-1xl rounded-lg px-5 py-2 font-semibold block outline-none border border-[#c3cad9]"
                name="email"
                value={userInput.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col mb-6 w-full password">
              <input
                type={revealPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="placeholder:text-[#959ead] text-dark mt-2 text-1xl rounded-lg px-5 py-2 font-semibold block outline-none border border-[#c3cad9]"
                name="password"
                value={userInput.password}
                onChange={handleInputChange}
              />

              <div className="revealIcons">
                {revealPassword ? (
                  <AiOutlineEyeInvisible onClick={reveal} />
                ) : (
                  <AiOutlineEye onClick={reveal} />
                )}
              </div>
            </div>

            <div className="flex flex-col mb-6 w-full">
              <Link
                to="/forgotpassword"
                className="text-primary text-[.8rem] font-semibold"
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex flex-col mb-6 w-full">
              <input
                type="submit"
                className="bg-primary rounded text-white py-2 font-semibold btn"
                value="Sign In"
              />
            </div>
            <div className="flex gap-2 mb-6 w-full">
              <p className="text-[.8rem] font-semibold">
                Dont have an account ?{" "}
              </p>
              <Link
                to="/register"
                className="text-primary text-[.8rem] font-semibold"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </LoginPage>
    </MainLayout>
  );
};

const LoginPage = styled.div`
  min-height: 72.6vh;
  .login {
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    padding: 1rem 2rem;
    border-radius: 1rem;
  }
  .password {
    position: relative;
  }
  .revealIcons {
    display: flex;
    align-items: center;
    justify-content: end;
    position: absolute;
    right: 1rem;
    bottom: 0.9rem;
    cursor: pointer;
  }
`;
export default Login;
