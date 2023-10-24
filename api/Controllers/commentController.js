const asyncHandler = require("express-async-handler");
const Comment = require("../Models/commentModel");
const Post = require("../Models/postModel");

const createComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!!!");
  }
  const comment = await Comment.create({ user: req.user.id, description });
  post.comments.push(comment);
  const savedComment = await post.save();
  res.status(201).json(savedComment);
});



const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) {
    res.status(404);
    throw new Error("Comment Not Found!!!");
  }
 if (comment.user.toString() != req.user.id) {
   res.status(401);
   throw new Error("User Not Authorized!!!");
 }
 res.status(200).json({ message: "Comment deleted successfully" });
});



module.exports = {
  createComment,
  deleteComment,
};
