import React from "react";
import MainLayout from "../components/MainLayout";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const NotFound = () => {
  return (
    <MainLayout>
      <NotF>
        <div className="notFound">
          <h1>PAGE NOT FOUND !!!</h1>
          <Link to="/" className="bg-primary text-white py-4 rounded-xl">
            <AiOutlineHome />
            Back Home
          </Link>
        </div>
      </NotF>
    </MainLayout>
  );
};

const NotF = styled.div`
  width: 100%;
  height: 80vh;
  position: relative;
  .notFound {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h1 {
    font-size: 4rem;
    font-weight: bold;
    color: red;
  }
  a {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    gap: 1rem;
  }
`;
export default NotFound;
