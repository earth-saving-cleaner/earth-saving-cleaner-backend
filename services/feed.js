const mongoose = require("mongoose");

const Feed = require("../models/Feed");
const Comment = require("../models/Comment");

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

  return await Feed.findOne({ _id: id })
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

exports.createComment = async (option) => {
  option.id = mongoose.Types.ObjectId(option.id);
  option.userId = mongoose.Types.ObjectId(option.userId);

  const comment = await Comment.create({ author: option.userId, content: option.content });
  const feedComments = await Feed.findByIdAndUpdate(
    option.id,
    { $push: { comment: comment._id } },
    { safe: true, upsert: true, new: true, populate: { path: "comment" } },
  )
    .select("comment")
    .exec();

  return feedComments;
};

exports.createFeed = async ({ userId, pictureUrl, content, location }) => {
  return await Feed.create({
    author: userId,
    content,
    image: pictureUrl,
    location,
  });
};

exports.addLikeUser = async (option) => {
  option.id = mongoose.Types.ObjectId(option.id);
  option.userId = mongoose.Types.ObjectId(option.userId);

  return await Feed.findByIdAndUpdate(
    option.id,
    { $addToSet: { like: option.userId } },
    { safe: true, upsert: true, new: true },
  ).exec();
};

exports.addCleanTrue = async (id) => {
  return await Feed.findOneAndUpdate(id, { $set: { cleaned: true } }, { new: true });
};
