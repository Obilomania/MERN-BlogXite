import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";
import styled from "styled-components";
import { IoArrowForward } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/userAuthSlice";
import {
  getPosts,
  selectAllPosts,
  selectIsloading,
} from "../../redux/features/post/postSlice";
import toastNotify from "../../Helpers/toastNotify";
import Loading from "../../components/Loading";

const Post = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsloading);
  const allPost = useSelector(selectAllPosts);
  const [allPostings, setAllPostings] = useState(allPost);
  const [visible, setVisible] = useState(8);

  const showMorePost = () => {
    setVisible((prevData) => prevData + 4);
    if (visible >= allPostings.length) {
      setVisible(allPostings.length);
      return toastNotify("Sorry, No More Post to Display", "info");
    }
    return;
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setAllPostings(allPost);
  }, [dispatch, allPost]);

  return (
    <PostSection>
      {isLoading && <Loading />}
      <div className="postCard">
        {allPostings.slice(0, visible).map((post: any, index: any) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
      <div className="morePost">
        {visible >= 13 ? (
          <button onClick={showMorePost} className="theEnd">
            The End
          </button>
        ) : (
          <button onClick={showMorePost}>
            More Articles <IoArrowForward />
          </button>
        )}
      </div>
    </PostSection>
  );
};

const PostSection = styled.div`
  width: 100%;
  height: fit-content;
  padding: 5rem 10rem;
  .post {
    width: 100%;
    h3 {
      font-weight: bolder;
    }
    span {
      width: 4rem;
      height: 0.2rem;
      background: #011736;
    }
  }
  .postCard {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: flex-start;
    gap: 5.3rem;
  }
  .morePost button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border: 2px solid #1565d8;
    color: #1565d8;
    border-radius: 0.7rem;
    width: fit-content;
    font-weight: 600;
    margin: auto;
    padding: 0.5rem 3rem;
    margin-top: 3.5rem;
    transition: 300ms all ease-in-out;
    &:hover {
      font-weight: 600;
      border: 2px solid #1565d8;
      color: white;
      transition: 300ms all ease-in-out;
      background: #1565d8;
    }
  }
  .morePost .theEnd {
    background: #1565d8;
    color: white;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    padding: 5rem 10rem;
    .post {
      width: 100%;
      h3 {
        font-weight: bolder;
      }
      span {
        width: 4rem;
        height: 0.2rem;
        background: #011736;
      }
    }
    .postCard {
      /* width:100%; */
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      margin: auto;
      gap: 3rem;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 1rem;
    .post {
      width: 100%;
      h3 {
        font-weight: bolder;
      }
      span {
        width: 4rem;
        height: 0.2rem;
        background: #011736;
      }
    }
    .postCard {
      /* width:100%; */
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      margin: auto;
      gap: 3rem;
    }
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    padding: 1rem;
    .post {
      width: 100%;
      h3 {
        font-weight: bolder;
      }
      span {
        width: 4rem;
        height: 0.2rem;
        background: #011736;
      }
    }
    .postCard {
      /* width:100%; */
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      margin: auto;
      gap: 3rem;
    }
  }
  @media screen and (max-width: 450px) {
    width: 100%;
    padding: 1rem;
    .post {
      width: 100%;
      h3 {
        font-weight: bolder;
      }
      span {
        width: 4rem;
        height: 0.2rem;
        background: #011736;
      }
    }
    .postCard {
      /* width:100%; */
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      margin: auto;
      gap: 2rem;
    }
  }
`;
export default Post;
