const asyncHandler = require("express-async-handler");
const Post = require("../Models/postModel");
const { fileSizeFormatter } = require("../Utilities/fileUpload");
const cloudinary = require("cloudinary").v2;

//Create Post
const createPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "BlogXite App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  const post = await Post.create({
    user: req.user.id,
    title,
    content,
    category,
    image: fileData,
  });

  res.status(201).json(post);
});

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort("-createdAt")
    .populate([
      {
        path: "user",
        select: ["name"],
      },
      {
        path: "comments",
      },
    ]);

  res.status(200).json(posts);
});

const getAPost = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const post = await Post.findById(id).populate([
    {
      path: "user",
      select: ["name"],
    },
    {
      path: "comments",
      match: {
        parent: null,
      },
      populate: [
        {
          path: "user",
          select: ["avatar", "name"],
        },
      ],
    },
  ]);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!!!");
  }
  const { user, title, content, category, comments, image } = post;
  res.status(200).json({ user, title, content, category, comments, image });
});

//Update Post
const updatePost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!!!");
  }
  if (post.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized!!!");
  }
  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "BlogXite App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
  const updatePost = await Post.findByIdAndUpdate(
    { _id: id },
    {
      title,
      content,
      category,
      image: Object.keys(fileData).length === 0 ? post?.image : fileData,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(updatePost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!!!");
  }
  if (post.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized!!!");
  }
  // await product.remove();
  res.status(200).json({ message: "Post deleted successfully" });
});

module.exports = {
  createPost,
  getAPost,
  getAllPost,
  updatePost,
  deletePost,
};
