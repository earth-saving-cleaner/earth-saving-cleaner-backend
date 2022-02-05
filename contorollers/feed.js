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
      feeds,
    };

    res.json(result);
  } catch (error) {
    next(error);
  }
};
