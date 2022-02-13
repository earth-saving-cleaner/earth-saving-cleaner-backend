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

    const updatedFeed = await feedService.addCleanTrue(id);
    const updatedUser = await userService.addUserScore(userId);
    await ploggingService.addPlogging({ userId, id });

    res.json({
      result: resultMsg.ok,
      updatedInfo: {
        updatedFeed,
        updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
