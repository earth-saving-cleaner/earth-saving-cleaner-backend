const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const feedSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    image: [
      {
        type: String,
        require: [true, "Please provide image url"],
      },
    ],
    content: {
      type: String,
      maxLength: 400,
    },
    location: {
      type: ObjectId,
      ref: "Geo",
      require: [true, "Please provide Geo information"],
    },
    address: {
      type: String,
      require: [true, "Please provide an address"],
    },
    like: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comment: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    cleaned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Feed", feedSchema);
