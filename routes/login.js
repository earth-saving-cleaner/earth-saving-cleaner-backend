const express = require("express");

const router = express.Router();

const loginController = require("../contorollers/login");

router.post("/", loginController.login);

module.exports = router;
