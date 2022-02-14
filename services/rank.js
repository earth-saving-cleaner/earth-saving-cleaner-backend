const User = require("../models/User");

const LIMIT = 10;
exports.getRank = async () => {
  return await User.find().sort({ score: -1 }).limit(LIMIT).exec();
};
