import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toastNotify from "../../Helpers/toastNotify";
import {
  registerUser,
  validateEmail,
} from "../../redux/features/auth/authService";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import {
  Set_User,
  User_Fullname,
  User_Loggedin,
} from "../../redux/features/auth/userAuthSlice";




const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const reveal = () => {
    setRevealPassword(!revealPassword);
  };

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput.name || !userInput.email || !userInput.password) {
      return toastNotify("Please, Fill all inputs", "error");
    }
    if (userInput.password.length < 6) {
      return toastNotify("Password  cannot be less than 6 characters", "error");
    }
    if (userInput.password !== userInput.confirmPassword) {
      return toastNotify("Passwords does not match", "error");
    }
    if (!validateEmail(userInput.email)) {
      return toastNotify("Please enter a valid email", "error");
    }

    setIsLoading(true);
    try {
      const userData: any = await registerUser({
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
      });
      await dispatch(User_Loggedin(true));
      await dispatch(User_Fullname(userData.name));
      await dispatch(
        Set_User({
          name: userData.name,
          email: userData.email,
          photo: userData.photo,
        })
      );
      navigate("/updateuser");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  

  return (
    <MainLayout>
      <Signup className="container mx-auto px-5 py-10">
        {isLoading && <Loading />}
        <div className="register w-full max-w-sm mx-auto mt-20">
          <h1 className="heading text-2xl font-bold text-center text-dark-hard mb-8">
            Register
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6 w-full">
              <input
                type="text"
                id="name"
                placeholder="Enter Your Full Name"
                className="placeholder:text-[#959ead] text-dark mt-2 text-1xl rounded-lg px-5 py-2 font-semibold block outline-none border border-[#c3cad9]"
                name="name"
                value={userInput.name}
                onChange={handleInputChange}
              />
            </div>

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
                value="Register"
              />
            </div>
            <div className="flex gap-2 mb-6 w-full">
              <p className="text-[.8rem] font-semibold">
                You have an account ?{" "}
              </p>
              <Link
                to="/login"
                className="text-primary text-[.8rem] font-semibold"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </Signup>
    </MainLayout>
  );
}

const Signup = styled.div`
  min-height: 72.6vh;
  .register {
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
export default Register;
