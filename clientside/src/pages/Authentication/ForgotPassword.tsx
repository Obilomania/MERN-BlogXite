import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { Link } from "react-router-dom";
import styled from "styled-components";
import toastNotify from "../../Helpers/toastNotify";
import {
  forgotPassword,
  validateEmail,
} from "../../redux/features/auth/authService";
import Loading from "../../components/Loading";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const reveal = () => {
    setRevealPassword(!revealPassword);
  };

  const [userInput, setUserInput] = useState({
    email: "",
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
    if (!userInput.email) {
      toastNotify("Please, Fill all inputs", "error");
      return setUserInput({ email: "" });
    }
    if (!validateEmail(userInput.email)) {
      return toastNotify("Please enter a valid email", "error");
    }
    setIsLoading(true);
    const userData: any = {
      email: userInput.email,
    };

    await forgotPassword(userData);
    setUserInput({ email: "" });
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <Forgot className="container mx-auto px-5 py-10">
        {isLoading && <Loading />}
        <div className="login w-full max-w-sm mx-auto">
          <h1 className="heading text-2xl font-bold text-center text-dark-hard mb-8">
            Forgot Password
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6 w-full password">
              <input
                type="text"
                id="email"
                placeholder="Enter Email Address"
                className="placeholder:text-[#959ead] text-dark mt-2 text-1xl rounded-lg px-5 py-2 font-semibold block outline-none border border-[#c3cad9]"
                name="email"
                value={userInput.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col mb-6 w-full">
              <input
                type="submit"
                className="bg-primary rounded text-white py-2 font-semibold btn"
                value="Get Reset Email"
              />
            </div>
            <div className="flex justify-between mb-6 w-full">
              <Link
                to="/login"
                className="text-primary text-[.8rem] font-semibold "
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-primary text-[.8rem] font-semibold"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </Forgot>
    </MainLayout>
  );
}

const Forgot = styled.div`
  min-height: 75vh;
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
export default ForgotPassword;
