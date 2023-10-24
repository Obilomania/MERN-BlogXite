import React from "react";
import styled from "styled-components";
// import { FiMessageSquare } from "react-icons/fi";
// import { IoPencilOutline } from "react-icons/io5";
// import { BsTrash } from "react-icons/bs";
// import ReplyForm from "./ReplyForm";

let Obilo = require("../../assets/Obi-min.png");

const Reply: React.FC = () => {
 
  return (
    <ReplySection>
      <div className="reply">
        <div className="img">
          <img src={Obilo} alt="" />
        </div>
        <div className="replyer">
          <div className="replyerAuthor">
            <div className="replyerDetail">
              <p className="name">Obinna Ishmael Iloanya</p>
              <p className="date">23 May 2023, 04:27PM</p>
            </div>
          </div>

          <p className="replyContent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            ipsam, maiores amet totam animi nemo quas cumque? Dolor, maiores
            deserunt repellendus, voluptas fugiat et, fuga temporibus laboriosam
            harum molestiae debitis?
          </p>
        </div>
      </div>
    </ReplySection>
  );
};

const ReplySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  .reply {
    width: 80%;
    display: flex;
    align-items: start;
    justify-content: center;
    gap: 1.5rem;
    border: 1px solid #c5c4c4;
    padding: 1rem;
    border-radius: 0.8rem;
  }
  .replyContent {
    text-align: justify;
  }
  .replyer {
    width: 100%;
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: start;
    gap: 0.4rem;
    .name {
      font-weight: 700;
    }
    .date {
      font-size: 0.5rem;
      width: 100%;
      letter-spacing: 1px;
      color: #444444;
    }
  }
  .img {
    display:none;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .replyCAL {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: end;
    cursor: pointer;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      color: #444444;
    }
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    .reply {
      width: 90%;
      display: flex;
      align-items: start;
      justify-content: center;
      gap: 2rem;
      border: 1px solid #c5c4c4;
      padding: 1rem;
      border-radius: 0.8rem;
    }
    .replyContent {
      text-align: justify;
    }
    .replyer {
      width: 100%;
      display: flex;
      align-items: start;
      flex-direction: column;
      justify-content: start;
      gap: 0.4rem;
      .name {
        font-weight: 700;
      }
      .date {
        font-size: 0.5rem;
        width: 100%;
        letter-spacing: 1px;
        color: #444444;
      }
    }
    .img {
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .replyCAL {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: end;
      cursor: pointer;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        color: #444444;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    .reply {
      width: 90%;
      display: flex;
      align-items: start;
      justify-content: center;
      gap: 2rem;
      border: 1px solid #c5c4c4;
      padding: 1rem;
      border-radius: 0.8rem;
    }
    .replyContent {
      text-align: justify;
    }
    .replyer {
      width: 100%;
      display: flex;
      align-items: start;
      flex-direction: column;
      justify-content: start;
      gap: 0.4rem;
      .name {
        font-weight: 700;
      }
      .date {
        font-size: 0.5rem;
        width: 100%;
        letter-spacing: 1px;
        color: #444444;
      }
    }
    .img {
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .replyCAL {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: end;
      cursor: pointer;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        color: #444444;
      }
    }
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    .reply {
      width: 90%;
      display: flex;
      align-items: start;
      justify-content: center;
      flex-direction:row;
      gap: 0rem;
      border: 1px solid #c5c4c4;
      padding: 1rem;
      border-radius: 0.8rem;
    }
    .replyContent {
      text-align: justify;
      width:100%;
    }
    .replyer {
      width: 100%;
      display: flex;
      align-items: start;
      flex-direction: column;
      justify-content: start;
      gap: 0.4rem;
      .name {
        font-weight: 700;
      }
      .date {
        font-size: 0.5rem;
        width: 100%;
        letter-spacing: 1px;
        color: #444444;
      }
    }
    .img {
      width:100%;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .replyCAL {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: end;
      cursor: pointer;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        color: #444444;
      }
    }
  }
  @media screen and (max-width: 450px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    .reply {
      width: 90%;
      display: flex;
      align-items: start;
      justify-content: center;
      gap: 0rem;
      border: 1px solid #c5c4c4;
      padding: 1rem;
      border-radius: 0.8rem;
    }
    .replyContent {
      text-align: justify;
    }
    .replyer {
      width: 100%;
      display: flex;
      align-items: start;
      flex-direction: column;
      justify-content: start;
      gap: 0.4rem;
      .name {
        font-weight: 700;
      }
      .date {
        font-size: 0.5rem;
        width: 100%;
        letter-spacing: 1px;
        color: #444444;
      }
    }
    .img {
      width:30%;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .replyCAL {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: end;
      cursor: pointer;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        color: #444444;
      }
    }
  }
`;

export default Reply;
