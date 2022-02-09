const express = require("express");
const router = express.Router();

const { getFeeds } = require("../contorollers/feed");
const { getFeedsLocation } = require("../contorollers/location");

router.get("/", getFeeds);
router.get("/locations", getFeedsLocation);

module.exports = router;
