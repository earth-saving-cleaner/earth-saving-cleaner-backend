const express = require("express");
const authJWT = require("../middlewares/authJwt");
const router = express.Router();

const userController = require("../contorollers/user");

router.get("/rank", authJWT, userController.getRankList);
router.get("/:id", authJWT, userController.getUser);

module.exports = router;
