import React from "react";
import styled from "styled-components";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PostCard = ({ post }: any) => {
  return (
    <PCard>
      <Link to={`/post/${post?.id}`}>
        <div className="imgeheading">
          <LazyLoadImage
            alt={post.image.fileName}
            src={post?.image.filePath}
            effect="blur"
          />
        </div>
        <div className="content">
          <p className="tag">{post?.category}</p>
          <p className="title text-dark">
            {post?.title.substring(0, 15).concat(" ...")}
          </p>
          <p className="writeUp">
            {post?.content.substring(0, 70).concat(" ")}{" "}
            <span className="font-bold text-primary">Read More ...</span>
          </p>
        </div>
        <div className="author">
          <div className="authee">
            <p className="name text-[.6rem]">{post.comments.length} comments</p>
            <p className="status text-green-500">
              <MdOutlineVerifiedUser />
            </p>
          </div>
          <p className="date font-bold text-[.6rem]">{post.created}</p>
        </div>
      </Link>
    </PCard>
  );
};

const PCard = styled.div`
  box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
  width: 20rem;
  padding-bottom: 1rem;
  overflow: hidden;
  height: 27.5rem;
  border-radius: 1rem;
  position: relative;
  /* height:28rem; */
  .title {
    font-weight: bolder;
  }
  .content {
    padding: 3rem 1rem 1rem 1rem;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    gap: 1.1rem;
    position: relative;
  }
  .tag {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(124, 176, 250, 0.3);
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
    border-radius: 1rem;
    letter-spacing: 1px;
    font-weight: bolder;
  }
  .writeUp {
    font-size: 0.9rem;
    color: grey;
    text-align: justify;
  }
  .imgeheading {
    width: 100%;
    height: 203.45px;
    overflow: hidden;
  }
  img {
    width: 20rem;
    height: 15rem;
  }
  .author {
    width: 100%;
    display: flex;
    /* flex-direction:c olumn; */
    justify-content: space-between;
    align-items: start;
    position: absolute;
    width: 90%;
    bottom: 1rem;
    left: 0.8rem;
  }
  .authee {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    font-size: 0.9rem;

    .name {
      font-weight: bolder;
      font-style: italic;
      margin-right: 0.2rem;
    }
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
  }
  @media screen and (max-width: 1200px) {
    width: fit-content;
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    width: 20rem;
    padding-bottom: 1rem;
    overflow: hidden;
    height: 26rem;
    border-radius: 1rem;
    .title {
      font-weight: bolder;
    }
    .content {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.1rem;
    }
    .writeUp {
      font-size: 0.9rem;
      color: grey;
      text-align: justify;
    }
    .imgeheading {
      width: 100%;
      height: 203.45px;
      overflow: hidden;
    }
    img {
      width: 20rem;
    }
    .author {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .authee {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
      font-size: 0.9rem;
      .name {
        font-weight: bolder;
        font-style: italic;
        margin-right: 0.2rem;
      }
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    width: fit-content;
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    width: 100%;
    padding-bottom: 1rem;
    overflow: hidden;
    height: 23rem;
    border-radius: 1rem;
    .title {
      font-weight: bolder;
      font-size: 1.3rem;
    }
    .content {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.1rem;
    }
    .writeUp {
      font-size: 1rem;
      color: grey;
      text-align: justify;
    }
    .imgeheading {
      width: 100%;
      height: 203.45px;
      overflow: hidden;
    }
    img {
      width: 100%;
    }
    .author {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .authee {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
      font-size: 0.9rem;
      .name {
        font-weight: bolder;
        font-style: italic;
        margin-right: 0.2rem;
      }
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
    }
  }
  @media screen and (max-width: 640px) {
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    width: 100%;
    padding-bottom: 0rem;
    overflow: hidden;
    height: 27rem;
    border-radius: 1rem;
    .title {
      font-weight: bolder;
      margin-top: 3rem;
    }
    .content {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0rem;
    }
    .writeUp {
      font-size: 0.9rem;
      color: grey;
      text-align: justify;
      margin: 1rem 0;
    }
    .imgeheading {
      width: 100%;
      height: 203.45px;
      overflow: hidden;
    }
    img {
      width: 100%;
    }
    .author {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .authee {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
      font-size: 0.9rem;
      .name {
        font-weight: bolder;
        font-style: italic;
        margin-right: 0.2rem;
      }
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
    }
  }
  @media screen and (max-width: 450px) {
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    width: 100%;
    padding-bottom: 0rem;
    overflow: hidden;
    height: 27rem;
    border-radius: 1rem;
    .tag {
      margin-top: -2rem;
    }
    .title {
      font-weight: bolder;
      font-size: 1rem;
      margin-top: 0;
    }
    .content {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0rem;
    }
    .writeUp {
      font-size: 0.9rem;
      color: grey;
      text-align: justify;
    }
    .imgeheading {
      width: 100%;
      height: 203.45px;
      overflow: hidden;
    }
    img {
      width: 100%;
    }
    .author {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .authee {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
      font-size: 0.9rem;
      .name {
        font-weight: bolder;
        font-style: italic;
        margin-right: 0.2rem;
      }
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
    }
  }
`;
export default PostCard;
