const { body, validationResult } = require("express-validator");

const { resultMsg } = require("../constants");

const commentValidationRules = () => {
  return [
    body("userId").not().isEmpty().withMessage("User id is empty").isString().withMessage("User id should be string"),
    body("content")
      .not()
      .isEmpty()
      .withMessage("Comment content is empty")
      .isString()
      .withMessage("Comment content should be string"),
  ];
};

const feedValidationRules = () => {
  return [
    body("userId").not().isEmpty().withMessage("User id is empty").isString().withMessage("User id should be string"),
    body("pictureUrl")
      .not()
      .isEmpty()
      .withMessage("pictureUrl is empty")
      .isArray()
      .withMessage("pictureUrl should be array"),
    body("pictureUrl")
      .custom((urls) => {
        for (const url of urls) {
          return typeof url === "string";
        }
      })
      .withMessage("pictureUrl should contain string values"),
    body("content")
      .custom((content) => {
        if (content.length === 0) {
          return true;
        }

        if (typeof content === "string") {
          return true;
        }

        return false;
      })
      .withMessage("Content should be string if content is not empty"),
    body("location")
      .not()
      .isEmpty()
      .withMessage("Location is empty")
      .isArray()
      .withMessage("pictureUrl should be array"),
    body("location")
      .custom(([longitude, latitude]) => {
        if (typeof longitude !== "number" || typeof latitude !== "number") {
          return false;
        }

        if (longitude > 180 || longitude < -180) {
          return false;
        }

        if (latitude > 90 || latitude < -90) {
          return false;
        }

        return true;
      })
      .withMessage("location is not valid"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.error(errors);

  if (errors.isEmpty()) {
    return next();
  }

  let errorMessages = "";
  errors.array().map((err) => (errorMessages += `${err.msg}. `));

  res.status(400).json({ result: resultMsg.fail, message: resultMsg.badRequest });
};

module.exports = {
  commentValidationRules,
  feedValidationRules,
  validate,
};
