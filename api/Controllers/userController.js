const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const Token = require("../Models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../Utilities/sendEmails");



//Function to generate JWT  for Users
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


//REGISTER NEW USER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 chatacters");
  }

  //Check if user email already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Email already exists");
  }

  //Create New User in Database
  const newUser = await User.create({
    name,
    email,
    password,
  });
  //Genrate token for new user
  const token = generateToken(newUser._id, newUser.name, newUser.email);

  //send HTTP-Only cookie to clientside
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //One Day
    sameSite: "none",
    secure: true,
  });
  if (newUser) {
    const { _id, name, email, phone } = newUser;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Validate login request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  //Check if user exists in Database
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, please sign up!!!");
  }

  //User exist but check if password is correct
  const passwordisValid = await bCrypt.compare(password, user.password);
  //Genrate token for new user
  const token = generateToken(user._id);

  //send HTTP-Only cookie to clientside
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //One Day
    sameSite: "none",
    secure: true,
  });

  if (user && passwordisValid) {
    const { _id, name, email, phone } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//Log the User Out
const logOut = asyncHandler(async (req, res) => {
  //Remove Cookie
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), //current moment
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "Successfully Logged out",
  });
});

//Get User Profile Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, phone, admin } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      admin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!!!");
  }
});

//Get login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  //verify the authenticity of the token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//Update user profile data
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { name, email, phone } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found!!!");
  }
});

//Change Password
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("user not found, please sign up");
  }
  const { oldPassword, password } = req.body;
  //Validation
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  //check if old password match with password in DB
  const passwordIsCorrect = await bCrypt.compare(oldPassword, user.password);
  //save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password changed successfully");
  } else {
    res.status(400);
    throw new Error("old password is Incorrect");
  }
});

//Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exists");
  }

  //Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //Create reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  //returnh token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //Save token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), //thirty Minutes
  }).save();

  //create a Reset URL
  const resetURL = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  //Create Reset email
  const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This reset link is valid for only 30mins</p>

        <a href=${resetURL} clicktracking=off>${resetURL}</a>

        <p>Regards...</p>
        <p>InventoryX Team.</p>
    `;
  const subject = "Password reset Request from (InventoryX)";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset email sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

//Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  //Hash token and compare to the token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Find Token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired token");
  }

  //find user if token has not expired
  const user = await User.findOne({ _id: userToken.userId });

  //Set User password
  user.password = password;
  await user.save();

  res.status(200).json({ message: "Password reset successful, please log in" });
});

module.exports = {
  registerUser,
  loginUser,
  logOut,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
