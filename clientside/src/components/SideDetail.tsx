import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SideDetail = ({post}:any) => {
  return (
    <SDetail>
      <Link to={`/post/${post?.id}`} className="latest">
        <div className="content">
          <img src={post?.image.filePath} alt="" />
          <div className="contentInfo">
            <p className="info">{post.title.substring(0,30).concat("...") }</p>
            <p className="date">{post?.created }</p>
          </div>
        </div>
      </Link>
    </SDetail>
  );
};
const SDetail = styled.div`
  width: 100%;
  .latest {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding-right: 1.5rem;
    transition: 400ms all ease;
    .content {
      display: flex;
      align-items: start;
      gap: 1rem;
      img {
        width: 6rem;
        border-radius: 0.5rem;
      }
      .contentInfo {
        display: flex;
        flex-direction: column;
        height: fit-content;
        justify-content: space-between;
        gap: 1.2rem;
        .info {
          font-weight: 700;
        }
        .date {
          font-size: 0.8rem;
          color: grey;
        }
      }
    }
    &:hover {
      box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
      margin-left: 1rem;
    }
  }
`;
export default SideDetail;
