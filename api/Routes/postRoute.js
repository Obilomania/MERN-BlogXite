const express = require("express");
const protect = require("../MiddleWares/authMiddleware");
const {
  createPost,
  getAllPost,
  getAPost,
  updatePost,
  deletePost,
} = require("../Controllers/postController");
const { upload } = require("../Utilities/fileUpload");
const router = express.Router();

//Post Route
router.post("/", protect, upload.single("image"), createPost);
router.get("/:id",  getAPost);
router.get("/", getAllPost);
router.patch("/:id", protect, upload.single("image"), updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
