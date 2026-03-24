import validator from "validator";

const validateAuth = (req, res, next) => {
  const fullName = req.body.fullName?.trim();
  const username = req.body.username?.trim();
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Invalid Email, Please enter valid Email" });
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, and a number",
    });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({
      message: "Username must contain only letters and numbers",
    });
  }

  next();
};

export default validateAuth;
