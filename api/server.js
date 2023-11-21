const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const postRoute = require("./Routes/postRoute");
const commentRoute = require("./Routes/commentRoute");
const errorHandler = require("./middlewares/errorMiddleware");
const path = require("path");

const app = express();
//Middleswares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://blogxite.onrender.com",
      "*",
    ],
    credentials: true,
  })
);

app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

//Routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api", commentRoute);
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
