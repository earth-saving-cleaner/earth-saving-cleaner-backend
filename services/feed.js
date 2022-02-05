const mongoose = require("mongoose");

const Feed = require("../models/Feed");

exports.getFeeds = async (option) => {
  const { lastId, limit } = option;

  if (lastId) {
    const id = mongoose.Types.ObjectId(lastId);

    return await Feed.find({ _id: { $lt: id } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("author", "nickname profileImage")
      .populate("location")
      .exec();
  }

  return await Feed.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("author", "nickname profileImage")
    .populate("location")
    .exec();
};
