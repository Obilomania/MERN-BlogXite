import React, { useState } from "react";
import inputHelpers from "../../Helpers/inputHelpers";
import { useDispatch } from "react-redux";
import { createNewComment } from "../../redux/features/comment/commentSlice";
import axios from "axios";
import Loading from "../../components/Loading";

interface addComment {
  id: any;
}
const AddComment = ({ id }: addComment) => {
  const [comment, setComment] = useState({ description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
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
    setIsLoading(true);
    const { description } = comment;
    const formData: any = new FormData();
    formData.append("description", description);
    const response = await axios.post(
      `http://localhost:5000/api/post/${id}`,
      { description: comment.description },
      { withCredentials: true }
    );
    console.log(response);
    setComment({ description: "" });
    setIsLoading(false);
    return response;
  };

  return (
    <div>
      
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
    </div>
  );
};

export default AddComment;
