const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

//Database scchema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an Email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a Password"],
      minLength: [6, "Password must be up to 6 characters"],
      //   maxLength: [23, "Password cant be more than 23 characters"],
    },
    phone: {
      type: String,
      default: "+234",
    },
    admin: {
      type: Boolean,
      default: "false",
    },
  },
  {
    timestamps: true,
  }
);

//Encrypt Password before saving to Db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  //Hash Password
  const salt = await bCrypt.genSalt(10);
  const hashedPassword = await bCrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
