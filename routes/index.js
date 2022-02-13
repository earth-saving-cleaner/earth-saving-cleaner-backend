const express = require("express");

const { getUser } = require("../contorollers/user");
const feed = require("./feed");
const feeds = require("./feeds");
const user = require("./user");
const login = require("./login");

const { signup } = require("../contorollers/signup");
const User = require("../models/User");
const Commemt = require("../models/Comment");
const Geo = require("../models/Geo");
const Plogging = require("../models/Plogging");

const router = express.Router();

router.use("/user", user);
router.use("/feeds", feeds);
router.use("/feed", feed);
router.use("/login", login);
router.post("/signup", signup);

module.exports = router;
