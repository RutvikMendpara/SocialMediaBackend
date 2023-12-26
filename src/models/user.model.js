const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    birthday: {
      type: Date,
      required: false,
    },
    bio: {
      type: String,
      required: false,
      trim: true,
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      ProUser: Number,
      VerifiedUser: Number,
      AdminUser: Number,
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
