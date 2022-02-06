const mongoose = require("mongoose");

const User = require("../models/User");

exports.getUser = async (userId) => {
  const id = mongoose.Types.ObjectId(userId);
  const { nickname, level, score, totalScore } = await User.findOne({ _id: id });

  return {
    nickname,
    level,
    score,
    totalScore,
  };
};
