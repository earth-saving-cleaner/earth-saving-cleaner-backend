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
      $project: { image: 1, coordinates: { $arrayElemAt: ["$location.coordinates", 0] }, cleaned: 1 },
    },
  ]);
};
