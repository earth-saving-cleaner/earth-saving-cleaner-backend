const mongoose = require("mongoose");
const createError = require("http-errors");

const userService = require("../services/user");
const rankService = require("../services/rank");
const { resultMsg } = require("../constants");

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      next(createError(400, "Invalid user id"));
    }

    const user = await userService.getUser(id);
    const result = {
      result: resultMsg.ok,
      user,
    };

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getRankList = async (req, res, next) => {
  try {
    const rankList = await rankService.getRank();

    res.json({
      result: resultMsg.ok,
      rankList,
    });
  } catch (err) {
    next(err);
  }
};
