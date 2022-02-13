const User = require("../models/User");
const jwt = require("../services/jwt");
const userService = require("../services/user");
const { resultMsg } = require("../constants");

exports.login = async (req, res, next) => {
  const { token } = req.body;

  try {
    const verifiedUser = await jwt.verifyGoogleToken(token);
    const user = await userService.getUserByEmail(verifiedUser.email);

    const result = {
      result: resultMsg.ok,
      message: "nickname Request",
      googleToken: token,
      email: verifiedUser.email,
    };

    if (!user) {
      res.json(result);
      return;
    }

    try {
      const jwtToken = await jwt.sign(user._id, verifiedUser.email);

      res.status(200).json({
        result: resultMsg.ok,
        token: jwtToken.accessToken,
        email: verifiedUser.email,
        id: user._id,
        profileImage: user.profileImage,
        nickname: user.nickname,
      });
    } catch (err) {
      console.error(err);
      res.status(401).json({
        result: resultMsg.fail,
        message: resultMsg.unauthorized,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      result: resultMsg.fail,
      message: resultMsg.serverError,
    });
  }
};
