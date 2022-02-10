const mongoose = require("mongoose");
const createError = require("http-errors");

const { resultMsg } = require("../constants");
const ploggingService = require("../services/plogging");
const feedService = require("../services/feed");
const userService = require("../services/user");

exports.addPlogging = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      next(createError(400, resultMsg.invalidFeedId));
    }

    if (!mongoose.isValidObjectId(userId)) {
      next(createError(400, resultMsg.invalidUserId));
    }

    await ploggingService.addPlogging({ userId, id });
    await feedService.addCleanTrue(id);
    await userService.addUserScore(userId);

    res.json({
      result: resultMsg.ok,
    });
  } catch (err) {
    res.status(400).json({
      result: resultMsg.fail,
      message: resultMsg.badRequest,
    });
  }
};
