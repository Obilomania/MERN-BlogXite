import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import AdminNav from "./AdminNav";
import AllPost from "./AllPost";
import CreatePostModal from "./CreatePostModal";

const Admin = () => {
   const [closeModal, setCloseModal] = useState<any>(false);
  const cancelModal = () => setCloseModal(!closeModal);
  

  return (
    <MainLayout>
      <AdminPage>
        <div className="left">
          <AdminNav cancelModal={cancelModal} />
        </div>
        <div className="right">
          <AllPost />
          {/* <CreatePost /> */}
          <CreatePostModal closeModal={closeModal} cancelModal={cancelModal} />
          
        </div>
      </AdminPage>
    </MainLayout>
  );
};
const AdminPage = styled.div`
  width: 100%;
  min-height:120vh;
  height: fit-content;
  display: flex;
  align-items: start;
  gap: 2rem;
  position: relative;
  .left {
  }
  .right {
    height:fit-content;
    border-radius:1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10vh;
    width: 78%;
    position: absolute;
    top: 8vh;
    left: 21%;
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    padding: 1rem 3rem 3rem 3rem;
  }
`;
export default Admin;
