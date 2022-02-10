const mongoose = require("mongoose");

const User = require("../models/User");

exports.getUser = async (userId) => {
  const id = mongoose.Types.ObjectId(userId);

  return await User.findOne({ _id: id }).select("nickname level score totalScore profileImage");
};

exports.addUserScore = async (userId) => {
  const { score } = await User.findOne({ _id: userId }).select("score");
  const level = score % 10 === 0 ? 1 : 0;

  await User.findByIdAndUpdate(userId, { $inc: { score: 1, level } });
};
