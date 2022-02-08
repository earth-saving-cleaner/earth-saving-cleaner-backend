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
  validate,
};
