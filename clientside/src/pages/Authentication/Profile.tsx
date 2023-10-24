import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { getProfile } from "../../redux/features/auth/authService";
import { useDispatch } from "react-redux";
import {
  Set_User,
  User_Fullname,
} from "../../redux/features/auth/userAuthSlice";
import Loading from "../../components/Loading";
import userProfile from "../../interfaces/userProfile";

const Profile = () => {
  const [profile, setProfile] = useState<userProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getProfile();
      setProfile(data);
      setIsLoading(false);
      await dispatch(Set_User(data));
      await dispatch(User_Fullname(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <MainLayout>
      <ProfilePage>
        {isLoading && <Loading />}
        <>
          {!isLoading && profile === null ? (
            <h1>Something went wrong, Please reload page</h1>
          ) : (
            <div className="profile w-full max-w-sm mx-auto mt-40">
              <h1 className="heading text-2xl font-bold text-center text-dark-hard mb-8">
                Profile Page
              </h1>

              <div className="info ">
                <p>
                  <span className="font-bold">Name</span> : {profile?.name}
                </p>
                <p>
                  <span className="font-bold">Email</span> : &nbsp;
                  {profile?.email}
                </p>
                <p>
                  <span className="font-bold">Phone</span> : {profile?.phone}
                </p>
                <div className="Cal w-full flex justify-between mt-5">
                  <Link
                    to="/updateuser"
                    className="bg-primary rounded w-[45%] text-[.8rem] text-center text-white py-2 font-semibold btn"
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/changepassword"
                    className="bg-primary rounded w-[45%] text-[.8rem] text-center text-white py-2 font-semibold btn"
                  >
                    Change Password
                  </Link>
                </div>
                {profile?.admin === true && (
                  <Link
                    to="/admin"
                    className="bg-primary rounded w-[100%] text-[.8rem] text-center text-white py-2 font-semibold btn"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      </ProfilePage>
    </MainLayout>
  );
};

const ProfilePage = styled.div`
  min-height: 63.7vh;
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
    p {
      width: 100%;
      transition: 400ms all ease-in-out;
      padding: 0.8rem 1rem;
      box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
      &:hover {
        margin-left: 0.8rem;
      }
    }
  }
`;
export default Profile;
