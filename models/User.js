const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    nickname: {
      type: String,
      require: [true, "Please tell us nickname name"],
      unique: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    level: {
      type: Number,
      default: 1,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
