const User = require("../models/User");
const jwt = require("../services/jwt");
const userService = require("../services/user");
const { resultMsg } = require("../constants");

exports.signup = async (req, res, next) => {
  console.log(req.body);
  const { googleToken, nickname } = req.body;

  const badRequestResult = {
    result: resultMsg.fail,
    message: resultMsg.badRequest,
  };

  if (!googleToken || !nickname) return res.status(400).json(badRequestResult);

  try {
    const verifiedUser = await jwt.verifyGoogleToken(googleToken);
    const user = await userService.getUserByNickname(nickname);

    if (user) {
      res.json({
        result: resultMsg.fail,
        message: "duplicatedNickname",
      });

      return;
    }

    try {
      const { email, sub, picture } = verifiedUser;
      await User.create({ email, nickname, profileImage: picture });
      const jwtToken = await jwt.sign(sub, email);

      return res.status(201).json({
        result: resultMsg.ok,
        message: resultMsg.created,
        token: jwtToken.accessToken,
        email,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        result: resultMsg.fail,
        message: resultMsg.serverError,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({
      result: resultMsg.fail,
      message: resultMsg.unauthorized,
    });
  }
};
