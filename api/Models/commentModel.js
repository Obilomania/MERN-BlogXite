const mongoose = require("mongoose");



const date = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}); // Create a Date object with the current date and time
const time = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const dateTimeString = `${date} ${time}`;
//Database scchema
const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    created: {
      type: String,
      default: dateTimeString,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);


const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
