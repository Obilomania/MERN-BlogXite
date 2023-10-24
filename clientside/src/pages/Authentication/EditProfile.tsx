import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainLayout from "../../components/MainLayout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import toastNotify from "../../Helpers/toastNotify";
import userProfile from "../../interfaces/userProfile";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/userAuthSlice";
import { updateUser } from "../../redux/features/auth/authService";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const [profile, setProfile] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData: any = await updateUser({
        name: profile.name,
        phone: profile.phone,
      });
      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <ProfileEdit>
        {isLoading && <Loading />}

        <div className="profile w-full max-w-sm mx-auto mt-40">
          <form onSubmit={handleSubmit}>
            <h1 className="heading text-2xl font-bold text-center text-dark-hard mb-8">
              Profile Page
            </h1>

            <div className="info ">
              <div className="upload input w-full">
                <label className="flex w-full font-bold text-[.8rem]">
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="upload input w-full">
                <label className="flex w-full font-bold text-[.8rem]">
                  Phone :
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile?.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="upload input w-full">
                <label className="flex w-full font-bold text-[.8rem]">
                  Email :
                </label>
                <input
                  type="text"
                  name="email"
                  value={profile?.email}
                  disabled
                />
                <span className="text-[.8rem] text-red-900">
                  Email cannot be changed
                </span>
              </div>
              <div className="Cal w-[100%] flex justify-between mt-5">
                <input
                  type="submit"
                  value="Update"
                  className="bg-primary rounded update text-[.8rem] text-center text-white  m-auto  font-semibold btn"
                />
                <Link
                  to="/changepassword"
                  className="bg-primary rounded w-[50%] text-[.8rem] text-center text-white py-3   font-semibold btn"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </form>
        </div>
      </ProfileEdit>
    </MainLayout>
  );
};

const ProfileEdit = styled.div`
  min-height: 63.7vh;
  max-height: fit-content;
  .profile {
    width: 100%;
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    padding: 1rem 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  }
  input {
    width: 100% !important;
    transition: 400ms all ease-in-out;
    padding: 0.8rem 1rem;
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    /* border: 1px solid #1565d8; */
    border-radius: 0.5rem;
    &:focus {
      outline: none;
    }
  }
  .update,
  a {
    width: 48% !important;
  }
`;
export default EditProfile;
