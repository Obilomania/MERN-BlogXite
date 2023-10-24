import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import Side from "./Side";
import Comment from "../../components/Post-Comment/Comment";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import inputHelpers from "../../Helpers/inputHelpers";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/userAuthSlice";
import { getSinglePost } from "../../redux/features/post/postSlice";
import toastNotify from "../../Helpers/toastNotify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  Set_Comment,
  createNewComment,
} from "../../redux/features/comment/commentSlice";
import axios from "axios";
import { IoIosArrowRoundBack } from "react-icons/io";

const PostDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = useState({ description: "" });
  const [LoadingIn, setLoadingIn] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const name = localStorage.getItem("name");
  const { post, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.post
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCommentInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelpers(e, comment);
    setComment(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      toastNotify("You have to sign in to place a comment", "info")
      navigate("/login");
      return;
    }
    if (comment.description === "") {
      toastNotify("You cant submit an empty Comment", "error");
      // setLoadingIn(false);
      return;
    }
    const { description } = comment;
    const formData: any = new FormData();
    formData.append("description", description);
    await dispatch(Set_Comment(comment.description));
    setComment({ description: "posting..." });
    const response = await axios.post(
      `http://localhost:5000/api/post/${id}`,
      { description: comment.description },
      { withCredentials: true }
    );
    console.log(response);
    setComment({ description: "" });
    dispatch(getSinglePost(id));
    return;
  };

  useEffect(() => {
    if (isLoggedIn === true || isLoading !== true) {
      dispatch(getSinglePost(id));
    }
    if (isError) {
      toastNotify(message, "error");
    }
  }, [isError, isLoggedIn, message, dispatch, id, isLoading]);

  return (
    <MainLayout>
      <Detail>
        {post && (
          <div className="postDetail mt-20">
            {LoadingIn && <Loading />}
            <div className="direction flex w-full justify-between items-center">
              <p>
                Home / Post /{" "}
                <span className="font-bold">
                  {post?.title.substring(0, 30).concat(" ...")}
                </span>
              </p>
              <div className="back ">
                <p
                  onClick={() => navigate(-1)}
                  className="font-bold flex bg-primary text-white px-4 cursor-pointer rounded-lg items-center gap-4"
                >
                  <IoIosArrowRoundBack size={30} /> Go Back
                </p>
              </div>
            </div>
            <div className="postImage overflow-hidden">
              <LazyLoadImage
                alt={post.image.fileName}
                src={post?.image.filePath}
                effect="blur"
              />
            </div>
            <div className="content">
              <div className="tag">
                <p className="font-bold">{post?.category.toUpperCase()}</p>
              </div>
              <div className="postTitle">
                <p className="font-bold">{post?.title}</p>
              </div>
              <div className="postDesc">{post?.content}</div>
            </div>
            {!name ? (
              <p className="text-[red] text-center font-bold">Login In to be able to place comments</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="formContent">
                  <textarea
                    placeholder="Leave a comment here..."
                    name="description"
                    value={comment.description}
                    onChange={handleCommentInput}
                  ></textarea>
                  <div className="send">
                    <input type="submit" value="Send" />
                  </div>
                </div>
              </form>
            )}
            <div className="comment">
              <div className="commentAmount">
                <p className="font-bold text-dark">
                  {post?.comments.length === 0 ? (
                    <span>No Comment</span>
                  ) : (
                    <span>All Comments ({post?.comments.length})</span>
                  )}
                </p>
              </div>
              <div className="commentSection">
                {post?.comments.map((comment: any, index: any) => (
                  <Comment comment={comment} key={index} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* <Loading /> */}

        <Side />
      </Detail>
    </MainLayout>
  );
};

const Detail = styled.div`
  display: flex;
  align-items: start;
  justify-content: flex-start;
  gap: 5%;
  width: 100%;
  min-height: 90vh;
  padding: 2rem 10rem;
  .postDetail {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    .direction {
      color: #1565d8;
    }
    .postImage {
      width: 948.8px;
      height: 603.86;
      overflow: hidden;
      border-radius: 1rem;
      box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
      img {
        width: 948.8px;
        height: 603.86px;
        margin: auto;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 0.7rem;
      .tag {
        color: #1565d8;
        letter-spacing: 4px;
        font-weight: 600;
      }
      .postTitle {
        font-size: 1.4rem;
        font-weight: bolder;
      }
      .postDesc {
        color: grey;
        text-align: justify;
      }
    }
    .formContent {
      width: 100%;
      position: relative;
      display: flex;
      align-items: end;
      justify-content: center;
      flex-direction: column;
      gap: 0.6rem;
      textarea {
        border: 1px solid #1565d8;
        width: 100%;
        height: 7rem;
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
      .send {
        /* position: absolute; */
        bottom: 1rem;
        right: 0;
        /* padding: 0 3rem 0 0; */
        input {
          background: #1565d8;
          color: white;
          padding: 0.5rem 3rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: 400ms all ease;
          &:hover {
            background: #3e89f3;
            color: white;
          }
        }
      }
    }
    .comment {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      gap: 1rem;
      .commentSection {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 1rem;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    display: flex;
    align-items: start;
    justify-content: flex-start;
    gap: 1.5rem;
    width: 100%;
    min-height: 90vh;
    padding: 1rem;
    flex-direction: column;
    .postDetail {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      .direction {
        color: #1565d8;
      }
      .postImage {
        width: 100%;
        img {
          width: 100%;
          margin: auto;
          border-radius: 1rem;
          box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.1rem;
        .tag {
          color: #1565d8;
          letter-spacing: 4px;
          font-weight: 600;
        }
        .postTitle {
          font-size: 1.4rem;
          font-weight: bolder;
          line-height: 1.6rem;
        }
        .postDesc {
          color: grey;
          text-align: justify;
          font-size: 0.8rem;
        }
      }
      .formContent {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        textarea {
          border: 1px solid #1565d8;
          width: 100%;
          height: 7rem;
          padding: 0.8rem;
          font-size: 0.8rem;
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
        .send {
          position: absolute;
          bottom: 0.5rem;
          right: 0;
          padding: 0 0.5rem 0 0;
          input {
            background: #1565d8;
            color: white;
            padding: 0.3rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: 400ms all ease;
            &:hover {
              background: #3e89f3;
              color: white;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    align-items: start;
    justify-content: flex-start;
    gap: 1.5rem;
    width: 100%;
    min-height: 90vh;
    padding: 1rem;
    flex-direction: column;
    .postDetail {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      .direction {
        color: #1565d8;
      }
      .postImage {
        width: 100%;
        img {
          width: 100%;
          margin: auto;
          border-radius: 1rem;
          box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.1rem;
        .tag {
          color: #1565d8;
          letter-spacing: 4px;
          font-weight: 600;
        }
        .postTitle {
          font-size: 1.4rem;
          font-weight: bolder;
          line-height: 1.6rem;
        }
        .postDesc {
          color: grey;
          text-align: justify;
          font-size: 0.8rem;
        }
      }
      .formContent {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        textarea {
          border: 1px solid #1565d8;
          width: 100%;
          height: 7rem;
          padding: 0.8rem;
          font-size: 0.8rem;
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
        .send {
          position: absolute;
          bottom: 0.5rem;
          right: 0;
          padding: 0 0.5rem 0 0;
          input {
            background: #1565d8;
            color: white;
            padding: 0.3rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: 400ms all ease;
            &:hover {
              background: #3e89f3;
              color: white;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 640px) {
    display: flex;
    align-items: start;
    justify-content: flex-start;
    gap: 1.5rem;
    width: 100%;
    min-height: 90vh;
    padding: 1rem;
    flex-direction: column;
    .postDetail {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      .direction {
        color: #1565d8;
      }
      .postImage {
        width: 100%;
        img {
          width: 100%;
          margin: auto;
          border-radius: 1rem;
          box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.1rem;
        .tag {
          color: #1565d8;
          letter-spacing: 4px;
          font-weight: 600;
        }
        .postTitle {
          font-size: 1.4rem;
          font-weight: bolder;
          line-height: 1.6rem;
        }
        .postDesc {
          color: grey;
          text-align: justify;
          font-size: 0.8rem;
        }
      }
      .formContent {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        textarea {
          border: 1px solid #1565d8;
          width: 100%;
          height: 7rem;
          padding: 0.8rem;
          font-size: 0.8rem;
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
        .send {
          position: absolute;
          bottom: 0.5rem;
          right: 0;
          padding: 0 0.5rem 0 0;
          input {
            background: #1565d8;
            color: white;
            padding: 0.3rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: 400ms all ease;
            &:hover {
              background: #3e89f3;
              color: white;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 450px) {
    display: flex;
    align-items: start;
    justify-content: flex-start;
    gap: 1.5rem;
    width: 100%;
    min-height: 90vh;
    padding: 1rem;
    flex-direction: column;
    .postDetail {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      .direction {
        color: #1565d8;
      }
      .postImage {
        width: 100%;
        img {
          width: 100%;
          margin: auto;
          border-radius: 1rem;
          box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.1rem;
        .tag {
          color: #1565d8;
          letter-spacing: 4px;
          font-weight: 600;
        }
        .postTitle {
          font-size: 1.4rem;
          font-weight: bolder;
          line-height: 1.6rem;
        }
        .postDesc {
          color: grey;
          text-align: justify;
          font-size: 0.8rem;
        }
      }
      .formContent {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        textarea {
          border: 1px solid #1565d8;
          width: 100%;
          height: 7rem;
          padding: 0.8rem;
          font-size: 0.8rem;
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
        .send {
          position: absolute;
          bottom: 0.5rem;
          right: 0;
          padding: 0 0.5rem 0 0;
          input {
            background: #1565d8;
            color: white;
            padding: 0.3rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: 400ms all ease;
            &:hover {
              background: #3e89f3;
              color: white;
            }
          }
        }
      }
    }
  }
`;
export default PostDetail;
