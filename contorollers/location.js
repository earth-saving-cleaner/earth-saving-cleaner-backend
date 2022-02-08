const locationService = require("../services/feeds");
const { resultMsg } = require("../constants");

// [37.514035, 127.05151, 37.50188, 127.06708] -> Mock data nw.lat nw.lng se.lat se.lng
exports.getFeedsLocation = async (req, res, next) => {
  try {
    const { coordinates } = req.query;
    const { nwLng, nwLat, seLng, seLat } = JSON.parse(coordinates);

    const polygonCoordinates = [
      [nwLng, nwLat],
      [seLng, nwLat],
      [seLng, seLat],
      [nwLng, seLat],
      [nwLng, nwLat],
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
