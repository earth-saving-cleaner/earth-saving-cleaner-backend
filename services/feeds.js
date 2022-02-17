const Feed = require("../models/Feed");

exports.getFeedsLocation = async (coordinates) => {
  return await Feed.aggregate([
    {
      $lookup: {
        from: "geos",
        localField: "location",
        foreignField: "_id",
        as: "location",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $match: {
        location: {
          $geoWithin: {
            $geometry: {
              type: "Polygon",
              coordinates: [coordinates],
            },
          },
        },
      },
    },
    {
      $project: { image: 1, coordinates: { $arrayElemAt: ["$location.coordinates", 0] }, cleaned: 1, author: 1 },
    },
  ]);
};
