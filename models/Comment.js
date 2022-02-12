const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const commentSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      maxLength: 100,
    },
  },
  { timestamps: { createdAt: true } },
);

module.exports = mongoose.model("Comment", commentSchema);
