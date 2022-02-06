const express = require("express");

const { getUser } = require("../contorollers/user");
const { getFeeds } = require("../contorollers/feed");
const feed = require("./feed");

const User = require("../models/User");
const Commemt = require("../models/Comment");
const Geo = require("../models/Geo");
const Plogging = require("../models/Plogging");

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/feeds", getFeeds);
router.use("/feed", feed);

module.exports = router;
