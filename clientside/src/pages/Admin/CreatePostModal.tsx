import React, { useState } from "react";
import styled from "styled-components";
import toastNotify from "../../Helpers/toastNotify";
import inputHelpers from "../../Helpers/inputHelpers";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPost,
} from "../../redux/features/post/postSlice";
import Loading from "../../components/Loading";

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
  "Others"
];

export interface modalProp {
  cancelModal: any;
  closeModal: boolean;
}


const CreatePostModal = ({ cancelModal, closeModal }: modalProp) => {
  const dispatch = useDispatch();

  const [postImage, setPostImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");


 const [isLoading, setIsLoading] = useState(false);
  const [postInput, setpostInput] = useState({
    title: "",
    image: "",
    content: "",
    category: "",
  });

  const handlePostInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelpers(e, postInput);
    setpostInput(tempData);
  };


  const handleImageChange = (e:any) => {
    setPostImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("title", postInput.title);
    formData.append("content", postInput.content);
    formData.append("category", postInput.category);
    formData.append("image", postImage);
    setIsLoading(true)
    await dispatch(createNewPost(formData));
    setpostInput({ title: "", image: "", content: "", category: "" , });
    setImagePreview("");
    cancelModal()
    setIsLoading(false)
  };
  return (
    <CreateModal>
      <div className={closeModal ? "create" : "destroy"}>
        {isLoading && <Loading />}
        <div className="modal">
          <h1 className="heading text-center text-2xl font-semibold text-primary bg-white py-3">
            Create A New Post
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
                  value={postInput.category}
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
                  value={postInput.title}
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
                  value={postInput.content}
                ></textarea>
              </div>
              <br />
              <input
                type="submit"
                value="Create Post"
                className="border-2 bg-blue-500 border-blue-500 px-6 py-1 rounded-full text-white font-semibold hover:bg-white hover:text-primary transition-all duration-500 cursor-pointer"
              />
            </form>
          </div>
          <button className="close" onClick={cancelModal}>
            Close
          </button>
        </div>
      </div>
    </CreateModal>
  );
};

const CreateModal = styled.div`
  width: 100%;
  .heading {
    border-radius: 1rem;
  }
  .date{
    display:none;
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
    background: rgba(0, 0, 0, 0.8);
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
    background: red;
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 0.7rem;
  }
`;
export default CreatePostModal;
