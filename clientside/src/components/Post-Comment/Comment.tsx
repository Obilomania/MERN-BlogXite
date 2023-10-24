import React, { useState } from "react";
import styled from "styled-components";
import { FiMessageSquare } from "react-icons/fi";
import { IoPencilOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import { useSelector } from "react-redux";


const Comment = ({comment, index} : any) => {
  const [openReply, setOpenReply] = useState(false);
  const revealReply = (e: React.FormEvent) => { setOpenReply(!openReply); };
  const { post, isError, isSuccess, message } = useSelector(
    (state: any) => state.comment
  );
  return (
    <CommentSection>
      <div className="commentContent w-[100%]">
        <div className="comment w-[100%]" key={index}>
          {/* <div className="image">
            <img src={Obilo} alt="" />
          </div> */}
          <div className="commenter w-[100%]">
            <div className="author">
              <div className="commenterDetail">
                <p className="name">{comment?.user.name}</p>
                <p className="date">{comment?.created}</p>
              </div>
            </div>

            <p className="theContent w-[100%]">{comment?.description}</p>
            <div className={openReply ? "closCAL" : "CAL"}>
              <p onClick={revealReply}>
                <FiMessageSquare /> Reply
              </p>
              <p>
                <IoPencilOutline /> Edit
              </p>
              <p>
                <BsTrash /> Delete
              </p>
            </div>
          </div>
          {/* <ReplyForm revealReply={revealReply} openReply={openReply} /> */}
        </div>
        {/* <div className="reply">
          <Reply />
        </div> */}
      </div>
    </CommentSection>
  );
};

const CommentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 1rem;

  .commenter .theContent{
    width:100%;
  }
  .commentContent {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f2f2f2;
    padding: 1.5rem;
    border-radius: 0.7rem;
    font-size: 0.8rem;
    position: relative;
    gap: 2rem;
  }
  .commentContent .comment {
    width: 100% !important;
    display: flex;
    /* flex-direction: row; */
  }
  .commentContent .commenter {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 0.8rem;
  }
  .author {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 2rem;

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
  .image {
    width: 3rem;
    overflow: hidden;
    height: 3rem;
    border-radius: 50%;
    display:none;
    image {
      width: 3rem;
      overflow: hidden;
      height: 3rem;
      border-radius: 50%;
    }
  }
  .CAL {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      color: #444444;
      cursor: pointer;
    }
  }
  .closCAL {
    display: none;
  }
`;
export default Comment;
