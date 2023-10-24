import React, { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import styled from "styled-components";
import {
  deleteAPost,
  getSinglePost,
  selectIsloading,
  selectPost,
  updateAPost,
} from "../../redux/features/post/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import inputHelpers from "../../Helpers/inputHelpers";
import Loading from "../../components/Loading";
import { BsTrash } from "react-icons/bs";

const Categories = [
  "",
  "Gossip",
  "Technology",
  "Adventure",
  "fashion",
  "Art",
  "Politics",
  "Medical",
  "Finance",
  "Others",
];

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsloading);
  const postEdit = useSelector(selectPost);

  const [post, setPost] = useState(postEdit);
  const [postImage, setPostImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  //FUNCTION FOR DELETING A POST
  const handleMenuItemDelete = async (id: any) => {
    await dispatch(deleteAPost(id));
    navigate("/admin");
  };

  const handlePostInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelpers(e, post);
    setPost(tempData);
  };

  const handleImageChange = (e: any) => {
    setPostImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  useEffect(() => {
    setPost(postEdit);
    setImagePreview(
      postEdit && postEdit.image ? `${postEdit.image.filePath}` : ""
    );
  }, [postEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData:any = new FormData();
    formData.append("_id", id);
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("category", post.category);
    if (postImage) {
      formData.append("image", postImage);
    }
    await dispatch(updateAPost({ id, formData }))
    navigate("/admin")
  };

  return (
    <EditModal>
      <div className="create">
        {isLoading && <Loading />}
        <div className="modal">
          <h1 className="heading text-center text-2xl font-semibold text-primary bg-white py-3">
            Edit Post
          </h1>{" "}
          <div className="formContent">
            <div className="imgPreview">
              <img
                src={
                  imagePreview
                    ? `${imagePreview}`
                    : "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="post"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="image">
                <input type="file" onChange={(e) => handleImageChange(e)} />
              </div>
              <div className="category">
                <label className="text-[.9rem] font-semibold text-dark">
                  {" "}
                  Category :{" "}
                </label>{" "}
                <br />
                <select
                  name="category"
                  value={post?.category}
                  onChange={handlePostInput}
                >
                  {Categories.map((category, index) => (
                    <option value={category} key={index}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>{" "}
              <div className="title">
                <label className="text-[.9rem] font-semibold text-dark">
                  {" "}
                  Post Title :{" "}
                </label>{" "}
                <br />
                <input
                  type="text"
                  placeholder="Post Title"
                  name="title"
                  onChange={handlePostInput}
                  value={post?.title}
                />
              </div>
              <div className="content">
                <label className="text-[.9rem] font-semibold text-dark">
                  {" "}
                  Post Content :{" "}
                </label>{" "}
                <textarea
                  placeholder="Post content"
                  name="content"
                  onChange={handlePostInput}
                  value={post?.content}
                ></textarea>
              </div>
              <br />
              <input
                type="submit"
                value="Update Post"
                className="border-2 bg-blue-500 border-blue-500 px-6 py-1 rounded-full text-white font-semibold hover:bg-white hover:text-primary transition-all duration-500 cursor-pointer"
              />
            </form>
          </div>
          <div className="close">
            <button className="" onClick={() => navigate(-1)}>
              Go back
            </button>
            <span className="" onClick={() => handleMenuItemDelete(id)}>
              <BsTrash /> Delete post
            </span>
          </div>
        </div>
      </div>
    </EditModal>
  );
};

const EditModal = styled.div`
  width: 100%;
  .heading {
    border-radius: 1rem;
  }
  .date {
    display: none;
  }
  .imgPreview {
    width: 26rem;
    height: 20rem;
    overflow: hidden;
    border-radius: 1rem;
  }
  .imgPreview img {
    width: 26rem;
    height: 20rem;
  }
  .destroy {
    display: none;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 11;
    overflow-x: hidden;
  }
  .create {
    display: block;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    z-index: 11;
    overflow-x: hidden;
  }
  .modal {
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    width: 60%;
    margin: auto;
    margin-top: 10vh;
    position: relative;
  }
  .formContent {
    position: relative;
    padding: 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: row-reverse;
    align-items: start;
    gap: 5rem;
    box-shadow: rgba(21, 101, 216, 0.3) 0px 9px 20px;
    background: white;
  }
  .formContent form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  .formContent form input,
  select {
    width: 100%;
    border: 1px solid lightgrey;
    padding: 0.7rem;
    border-radius: 0.5rem;
  }
  .formContent form textarea {
    width: 100%;
    border: 1px solid lightgrey;
    padding: 0.7rem;
    border-radius: 0.5rem;
    height: 10rem;
    resize: none;
  }
  .close {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    button {
      background: #1565d8;
      padding: 0.4rem 0.8rem;
      border-radius: 0.7rem;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;
      background: red;
      padding: 0.4rem 0.8rem;
      border-radius: 0.7rem;
      cursor: pointer;
    }
  }
`;
export default EditPost;
