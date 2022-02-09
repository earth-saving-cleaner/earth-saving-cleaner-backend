const express = require("express");

const { getUser } = require("../contorollers/user");
const { getFeeds } = require("../contorollers/feed");
const feed = require("./feed");
const user = require("./user");

const User = require("../models/User");
const Commemt = require("../models/Comment");
const Geo = require("../models/Geo");
const Plogging = require("../models/Plogging");

const router = express.Router();

router.use("/user", user);
router.use("/feed", feed);
router.get("/feeds", getFeeds);

module.exports = router;
