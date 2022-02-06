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

exports.getFeed = async (id) => {
  id = mongoose.Types.ObjectId(id);

  return await Feed.findOne({ author: id })
    .populate("author", "nickname profileImage")
    .populate("location")
    .populate("comment", "nickname profileImage")
    .populate({
      path: "comment",
      populate: {
        path: "author",
        select: "nickname profileImage",
      },
    })
    .exec();
};
