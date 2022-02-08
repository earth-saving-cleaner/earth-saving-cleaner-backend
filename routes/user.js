const express = require("express");
const router = express.Router();

const userController = require("../contorollers/user");

router.get("/:id", userController.getUser);

module.exports = router;
