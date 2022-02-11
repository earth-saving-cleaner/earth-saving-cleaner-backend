const express = require("express");

const router = express.Router();

const signupController = require("../contorollers/signup");

router.post("/", signupController.signup);

module.exports = router;
