import React from "react";
import styled from "styled-components";

interface ReplyState {
  revealReply: any;
  openReply: Boolean;
}

const ReplyForm: React.FC<ReplyState> = ({ revealReply, openReply }) => {
  const postReply = (e: React.FormEvent,) => {
    e.preventDefault();
      alert("welcome");
      window.location.reload();
  };

  return (
    <RForm>
      <div className={openReply ? "formOpen" : "formClose"}>
        <form onSubmit={postReply}>
          <textarea name="" placeholder="Reply to Comment..."></textarea>
          <div className="replyCAL">
            <input type="submit" value="Reply" />
            <button onClick={revealReply}>Cancel</button>
          </div>
        </form>
      </div>
    </RForm>
  );
};

const RForm = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
  .formOpen {
    position: relative;
    width: 100%;
    display: block;
  }
  .formClose {
    position: relative;
    width: 100%;
    display: none;
  }
  textarea {
    border: 1px solid #1565d8;
    width: 100%;
    height: 6rem;
    padding: 1rem;
    border-radius: 0.5rem;
    resize: none;
    &::placeholder {
      font-size: 0.8rem;
    }
    &:focus {
      outline: none !important;
      border: 1px solid #1565d8;
    }
  }
  .replyCAL {
    margin-top: 0.6rem;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
    input {
      background: #1565d8;
      color: white;
      padding: 0.2rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      border: 1px solid #1565d8;
      cursor: pointer;
      transition: 400ms all ease;
      &:hover {
        background: #3e89f3;
        color: white;
        border: 1px solid #3e89f3;
      }
    }
    button {
      background: red;
      color: white;
      padding: 0.2rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      border: 1px solid red;
      cursor: pointer;
      transition: 400ms all ease;
      &:hover {
        background: white;
        color: red;
        border: 1px solid red;
      }
    }
  }
`;
export default ReplyForm;
