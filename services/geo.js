const mongoose = require("mongoose");

const Geo = require("../models/Geo");

exports.createGeo = async ({ location }) => {
  return await Geo.create({
    type: "Point",
    coordinates: location,
  });
};
