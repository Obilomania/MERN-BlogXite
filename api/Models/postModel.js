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
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    content: {
      type: String,
      required: true,
    },
    created: {
      type: String,
      default: dateTimeString,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: "",
      trim: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// postSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "post",
//   check: "true"
// });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
