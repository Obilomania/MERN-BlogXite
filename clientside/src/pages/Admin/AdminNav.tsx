import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminNav = ({ cancelModal }: any) => {
  return (
    <AdminNavigation>
      <div className="navigation">
        <Link to="" className="text-primary font-semibold ">
          All Post
        </Link>
        <Link to="" className="text-primary font-semibold " onClick={cancelModal}>
          Create Post
        </Link>

       
      </div>
    </AdminNavigation>
  );
};

const AdminNavigation = styled.div`
  width: 20%;
  height: 100vh;
  top: 0;
  left: 0;
  box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
  position: fixed;
  .navigation {
    padding: 10rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    gap: 3rem;
  }
  .navigation a {
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    width: 80%;
    text-align: center;
    padding: 1rem 0;
    transition: 400ms all ease;
  }
  .navigation a:hover {
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    width: 80%;
    text-align: center;
    padding: 1rem 0;
    margin-left: 1.2rem;
  }
`;
export default AdminNav;
