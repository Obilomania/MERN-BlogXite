import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Foot className="bg-dark">
      <p>
        BlogXite designed with &nbsp; <span> &#10084;</span>&nbsp; by Obilomania
        &copy;
      </p>
    </Foot>
  );
};

const Foot = styled.div`
  width: 100%;
  height: 20vh;
  position: relative;
  p {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    span {
      color: red;
    }
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 20vh;
    position: relative;
    p {
      width: 100%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
      font-size: 0.8rem;
      span {
        color: red;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 20vh;
    position: relative;
    p {
      width: 100%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
      font-size: 0.8rem;
      span {
        color: red;
      }
    }
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    height: 20vh;
    position: relative;
    p {
      width: 100%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
      font-size: 0.8rem;
      span {
        color: red;
      }
    }
  }
  @media screen and (max-width: 450px) {
    width: 100%;
    height: 20vh;
    position: relative;
    p {
      width: 100%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
      font-size: 0.8rem;
      span {
        color: red;
      }
    }
  }
`;
export default Footer;
