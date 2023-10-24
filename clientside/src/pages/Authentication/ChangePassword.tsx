import React, { useState } from "react";
import styled from "styled-components";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import toastNotify from "../../Helpers/toastNotify";
import { changePassword } from "../../redux/features/auth/authService";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const reveal = () => {
    setRevealPassword(!revealPassword);
  };

  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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

    if (!userInput.oldPassword) {
      return toastNotify("Please, Fill all inputs", "error");
    }
    if (userInput.oldPassword.length < 6) {
      return toastNotify("Password  cannot be less than 6 characters", "error");
    }
    if (userInput.newPassword !== userInput.confirmNewPassword) {
      return toastNotify("Passwords does not match", "error");
    }
    setIsLoading(true);
    try {
      const userData: any = await changePassword({
        oldPassword: userInput.oldPassword,
        password: userInput.newPassword,
      });
      navigate("/profile");
      toastNotify("Password Change Successful!!!", "success");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <MainLayout>
      <PasswordChange>
        <div className="register w-full max-w-sm mx-auto mt-40">
          <h1 className="heading text-2xl font-bold text-center text-dark-hard mb-2">
            Change Password
          </h1>
          <div className="info ">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6 w-full password">
                <input
                  type={revealPassword ? "text" : "password"}
                  id="old password"
                  placeholder="Old Password"
                  className="placeholder:text-[#959ead] text-dark mt-2 text-1xl rounded-lg px-5 py-2 font-semibold block outline-none border border-[#c3cad9]"
                  name="oldPassword"
                  value={userInput.oldPassword}
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
                  id="password"
                  placeholder="New Password"
                  className="placeholder:text-[#959ead] text-dark mt-2 text-1xl rounded-lg px-5 py-2 font-semibold block outline-none border border-[#c3cad9]"
                  name="newPassword"
                  value={userInput.newPassword}
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
                  placeholder="Confirm New Password"
                  className="placeholder:text-[#959ead] text-dark mt-2 text-1xl rounded-lg px-5 py-2 font-semibold block outline-none border border-[#c3cad9]"
                  name="confirmNewPassword"
                  value={userInput.confirmNewPassword}
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
                  value="Update Password"
                />
              </div>
              <div className="flex gap-2 mb-6 w-full">
                <p className="text-[.8rem] font-semibold">
                  You have an account ?{" "}
                </p>
                <Link
                  to="/login"
                  className="text-primary text-[.8rem] font-semibold login"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </PasswordChange>
    </MainLayout>
  );
};

const PasswordChange = styled.div`
  min-height: 63.7vh;
  .register {
    width: 100%;
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    padding: 1rem 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  form {
    width: 100%;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
    justify-content: center;
    text-align: justify;
    margin: 2rem 0;
    width: 100%;
    input {
      width: 100%;
      transition: 400ms all ease-in-out;
      padding: 0.8rem 1rem;
      box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;

      border-radius: 0.5rem;
      &:focus {
        outline: none;
      }
    }
    a {
    }
  }
  .update,
  a {
    width: 48% !important;
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
export default ChangePassword;
