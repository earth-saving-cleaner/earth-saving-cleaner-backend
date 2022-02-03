const express = require("express");

const feed = require("./feed");

const router = express.Router();

router.use("/feed", feed);

module.exports = router;
