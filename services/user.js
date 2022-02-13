const mongoose = require("mongoose");

const User = require("../models/User");

exports.getUser = async (userId) => {
  const id = mongoose.Types.ObjectId(userId);

  return await User.findOne({ _id: id }).select("nickname level score totalScore profileImage");
};

exports.getUserByNickname = async (nickname) => {
  return await User.findOne({ nickname }).exec();
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email }).exec();

exports.addUserScore = async (userId) => {
  const { score } = await User.findOne({ _id: userId }).select("score");
  const level = (score + 1) % 10 ? 0 : 1;

  return await User.findByIdAndUpdate(userId, { $inc: { score: 1, level } }, { new: true });
};
