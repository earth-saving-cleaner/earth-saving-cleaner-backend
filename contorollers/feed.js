const mongoose = require("mongoose");
const createError = require("http-errors");

const feedService = require("../services/feed");
const { resultMsg } = require("../constants");

exports.getFeeds = async (req, res, next) => {
  try {
    const { id, limit } = req.query;

    if (id && !mongoose.isValidObjectId(id)) {
      next(createError(400, "Invalid feed last feed id"));
    }

    const option = {
      lastId: id,
      limit: validateLimit(limit),
    };

    const feeds = await feedService.getFeeds(option);
    const result = {
      result: resultMsg.ok,
      lastId: feeds[feeds.length - 1]._id,
      feeds,
    };

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const validateLimit = (limit) => {
  const LIMIT = 30;

  if (typeof limit !== "number" || typeof limit !== "string") {
    return LIMIT;
  }

  if (limit <= 0) {
    return LIMIT;
  }

  return Number(limit);
};
