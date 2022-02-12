const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const ploggingSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
      required: [true, "Please provide author id"],
    },
    feedId: {
      type: ObjectId,
      ref: "Feed",
      required: [true, "Please provide feed id"],
    },
  },
  { timestamps: { createdAt: true } },
);

module.exports = mongoose.model("Plogging", ploggingSchema);
