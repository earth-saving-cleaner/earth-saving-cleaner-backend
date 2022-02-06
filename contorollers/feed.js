const mongoose = require("mongoose");
const createError = require("http-errors");

const feedService = require("../services/feed");
const { resultMsg } = require("../constants");

exports.getFeeds = async (req, res, next) => {
  try {
    const { id, limit } = req.query;
    const option = {
      lastId: id,
      limit: limit || 30,
    };

    const feeds = await feedService.getFeeds(option);
    const result = {
      result: resultMsg.ok,
      lastId: feeds[feeds.length - 1]._id,
      data: feeds,
    };

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getFeed = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      next(createError(400, "Invalid feed id"));
    }

    const feed = await feedService.getFeed(id);

    res.json({
      result: resultMsg.ok,
      data: feed,
    });
  } catch (err) {
    next(err);
  }
};

exports.addLikeUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      next(createError(400, "Invalid feed id"));
    }

    if (!mongoose.isValidObjectId(userId)) {
      next(createError(400, "Invalid user id"));
    }

    const feed = await feedService.addLikeUser({ id, userId });

    res.json({
      result: resultMsg.ok,
      data: feed,
    });
  } catch (err) {
    next(err);
  }
};
