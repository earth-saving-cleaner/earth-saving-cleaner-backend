const mongoose = require("mongoose");

const { Schema } = mongoose;

const geoSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
    index: "2dsphere",
  },
});

module.exports = mongoose.model("Geo", geoSchema);
