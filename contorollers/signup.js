const User = require("../models/User");
const jwt = require("../services/jwt");
const signup = require("../services/signup");
const { resultMsg } = require("../constants");

exports.signup = async (req, res, next) => {
  const { token, userNickname } = req.body;
  const badRequestResult = {
    result: resultMsg.fail,
    message: resultMsg.badRequest,
  };

  if (!token || !userNickname) return res.status(400).json(badRequestResult);

  try {
    const verifiedUser = await jwt.verifyGoogleToken(token);

    const verifiedNickname = await signup.verifyDuplicate(userNickname);

    const exsistingNicknameResult = {
      result: resultMsg.fail,
      message: "exsisting nickname",
    };

    if (verifiedNickname) return res.status(400).json(exsistingNicknameResult);

    try {
      const { email, sub, picture } = verifiedUser;
      await User.create({ email, nickname: userNickname, profileImage: picture });
      const jwtToken = await jwt.sign(sub, email);

      return res.status(201).json({
        result: resultMsg.ok,
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
