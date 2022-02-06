const express = require("express");

const router = express.Router();

const loginController = require("../contorollers/login");

router.post("/", loginController.verifyGoogleIdToken);

module.exports = router;
