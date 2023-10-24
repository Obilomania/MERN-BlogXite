import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import toastNotify from "../../Helpers/toastNotify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loading from "../../components/Loading";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/features/auth/authService";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const reveal = () => {
    setRevealPassword(!revealPassword);
  };
  const [userInput, setUserInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const { resetToken } = useParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.password) {
      return toastNotify("Please, Fill all inputs", "error");
      // return setUserInput({ password: "" });
    }
    if (userInput.password.length < 6) {
      return toastNotify("Password  cannot be less than 6 characters", "error");
    }
    if (userInput.password !== userInput.confirmPassword) {
      return toastNotify("Passwords does not match", "error");
    }

    setIsLoading(true);
    const userData: any = {
      password: userInput.password,
    };
    try {
      const data: any = resetPassword(userData, resetToken);
      toastNotify(data.message);
    } catch (error: any) {
      toastNotify(error);
    }
    setIsLoading(false);
  };
  return (
    <MainLayout>
      <Reset>
        {isLoading && <Loading />}
        <div className="login w-full max-w-sm mx-auto mt-40">
          <h1 className="heading text-2xl font-bold text-center text-dark-hard mb-8">
            Reset Password
          </h1>
          <form onSubmit={handleSubmit}>
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
            <div className="flex flex-col mb-6 w-full password">
              <input
                type={revealPassword ? "text" : "password"}
                id="confirm password"
                placeholder="Confirm Password"
                className="placeholder:text-[#959ead] text-dark mt-2 text-1xl rounded-lg px-5 py-2 font-semibold block outline-none border border-[#c3cad9]"
                name="confirmPassword"
                value={userInput.confirmPassword}
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
              <input
                type="submit"
                className="bg-primary rounded text-white py-2 font-semibold btn"
                value="Reset Password"
              />
            </div>
            <div className="flex justify-between mb-6 w-full">
              <Link
                to="/register"
                className="text-primary text-[.8rem] font-semibold"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-primary text-[.8rem] font-semibold "
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </Reset>
    </MainLayout>
  );
};

const Reset = styled.div`
  min-height: 56.3vh;
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
export default ResetPassword;
