const User = require("../models/User");
const jwt = require("../services/jwt");
const userService = require("../services/user");
const { resultMsg } = require("../constants");

exports.signup = async (req, res, next) => {
  const { googleToken, nickname } = req.body;

  if (!googleToken || !nickname) {
    res.status(400).json({
      result: resultMsg.fail,
      message: resultMsg.badRequest,
    });
    return;
  }

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
      const { email, picture } = verifiedUser;
      const newUser = await User.create({ email, nickname, profileImage: picture });
      const jwtToken = await jwt.sign(newUser._id, email);

      res.status(201).json({
        result: resultMsg.ok,
        message: resultMsg.created,
        token: jwtToken.accessToken,
        email,
        id: newUser._id,
        profileImage: newUser.profileImage,
        nickname: newUser.nickname,
        level: newUser.level,
        score: newUser.score,
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
