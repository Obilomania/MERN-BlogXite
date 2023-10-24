const express = require("express");
const { createComment, deleteComment } = require("../Controllers/commentController");
const protect = require("../MiddleWares/authMiddleware");
const router = express.Router();

//comment Route

router.post("/post/:id", protect, createComment);
router.delete("/post/:id/comments/:id", protect, deleteComment);

module.exports = router;
