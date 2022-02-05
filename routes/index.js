const express = require("express");

const { getFeeds } = require("../contorollers/feed");
const feed = require("./feed");

const User = require("../models/User");
const Commemt = require("../models/Comment");
const Geo = require("../models/Geo");
const Plogging = require("../models/Plogging");

const router = express.Router();

router.get("/feeds", getFeeds);
router.use("/feed", feed);

module.exports = router;
