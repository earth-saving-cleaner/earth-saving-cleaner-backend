const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const feedController = require("../contorollers/feed");

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "earth-saving-cleaner",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", upload.single("img"), (req, res) => {
  console.log(req.file);
  const originalUrl = req.file.location;
  const url = originalUrl.replace(/\/original\//, "/thumb/");
  res.json({ url, originalUrl: req.file.location });
});

router.put("/:id/like", feedController.addLikeUser);

router.get("/:id", feedController.getFeed);

module.exports = router;
