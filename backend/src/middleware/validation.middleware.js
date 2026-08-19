const validator = require("validator");
const AppError = require("../utils/AppError");

const isValidBody = (body) => {
  return body && typeof body === "object" && !Array.isArray(body);
};

const validateRegister = (req, res, next) => {
  if (!isValidBody(req.body)) {
    return next(new AppError("Request body is required.", 400));
  }

  const { name, email, password } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return next(new AppError("Invalid request data.", 400));
  }

  if (!name.trim() || !email.trim() || !password.trim()) {
    return next(new AppError("All fields are required.", 400));
  }

  if (!validator.isEmail(email)) {
    return next(new AppError("Please provide a valid email address.", 400));
  }

  if (password.length < 8) {
    return next(new AppError("Password must be at least 8 characters long.", 400));
  }

  next();
};

const validateLogin = (req, res, next) => {
  if (!isValidBody(req.body)) {
    return next(new AppError("Request body is required.", 400));
  }

  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return next(new AppError("Invalid request data.", 400));
  }

  if (!email.trim() || !password.trim()) {
    return next(new AppError("Email and password are required.", 400));
  }

  next();
};

const validateNote = (req, res, next) => {
  if (
    !req.body ||
    typeof req.body !== "object" ||
    Array.isArray(req.body)
  ) {
    return next(new AppError("Request body is required.", 400));
  }

  const { title, content } = req.body;

  if (typeof title !== "string" || typeof content !== "string") {
    return next(new AppError("Title and content must be strings.", 400));
  }

  if (!title.trim() || !content.trim()) {
    return next(new AppError("Title and content are required.", 400));
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateNote,
};