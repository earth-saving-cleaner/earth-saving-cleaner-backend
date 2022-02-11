const locationService = require("../services/feeds");
const { resultMsg } = require("../constants");

// [37.514035, 127.05151, 37.50188, 127.06708] -> Mock data nw.lat nw.lng se.lat se.lng
exports.getFeedsLocation = async (req, res, next) => {
  try {
    const { coordinates } = req.query;
    const { NWlongitude, NWlatitude, SElongitude, SElatitude } = JSON.parse(coordinates);

    const polygonCoordinates = [
      [NWlongitude, NWlatitude],
      [SElongitude, NWlatitude],
      [SElongitude, SElatitude],
      [NWlongitude, SElatitude],
      [NWlongitude, NWlatitude],
    ];

    const feedInfo = await locationService.getFeedsLocation(polygonCoordinates);

    res.json({
      result: resultMsg.ok,
      feedInfo,
    });
  } catch (err) {
    next(err);
  }
};
