const mongoose = require("mongoose");
const createError = require("http-errors");

const feedService = require("../services/feed");
const geoService = require("../services/geo");
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
    const userId = req.body.userId;

    const objectId = mongoose.Types.ObjectId(id);
    const objectUserId = mongoose.Types.ObjectId(userId);

    if (!mongoose.isValidObjectId(objectId)) {
      next(createError(400, "Invalid feed id"));
    }

    if (!mongoose.isValidObjectId(objectUserId)) {
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

exports.createComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.id;

    if (!mongoose.isValidObjectId(id)) {
      next(createError(400, "Invalid feed id"));
    }

    if (!mongoose.isValidObjectId(userId)) {
      next(createError(400, "Invalid user id"));
    }

    const comments = await feedService.createComment({ id, userId, content });
    res.json({
      result: resultMsg.ok,
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

exports.createFeed = async (req, res, next) => {
  try {
    const { pictureUrl, content, location, address } = req.body;
    const userId = req.id;

    if (!mongoose.isValidObjectId(userId)) {
      next(createError(400, "Invalid user id"));
    }

    const geo = await geoService.createGeo({ location });
    const feed = await feedService.createFeed({ userId, pictureUrl, content, location: geo._id, address });

    res.json({
      result: resultMsg.ok,
      data: feed,
    });
  } catch (err) {
    next(err);
  }
};

const validateLimit = (limit) => {
  const LIMIT = 30;

  if (typeof limit !== "number" && typeof limit !== "string") {
    return LIMIT;
  }

  if (Number(limit) <= 0) {
    return LIMIT;
  }

  return Number(limit);
};
