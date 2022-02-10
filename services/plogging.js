const Plogging = require("../models/Plogging");

exports.addPlogging = async ({ userId, id }) => {
  await Plogging.create({ author: userId, feedId: id });
};
