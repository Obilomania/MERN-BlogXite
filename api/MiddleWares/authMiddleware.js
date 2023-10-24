const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { request } = require("express");

const protect = asyncHandler(async (req, res, next) => {
  try {
    //check if there is a token in the cookie
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
    //verify the authenticity of the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //Get User id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User Not Found!!!");
      }
      req.user = user
      next();
  } catch (error) {
      res.status(401);
      throw new Error("User not authorized, please login");
  }
});

module.exports = protect;
