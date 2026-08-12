const validator = require("validator");

const isValidBody = (body) => {
  return body && typeof body === "object" && !Array.isArray(body);
};

const validateRegister = (req, res, next) => {
  if (!isValidBody(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Request body is required.",
    });
  }

  const { name, email, password } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data.",
    });
  }

  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long.",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  if (!isValidBody(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Request body is required.",
    });
  }

  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data.",
    });
  }

  if (!email.trim() || !password.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  next();
};

const validateNote = (req, res, next) => {
  const { title, content } = req.body;

  if (
    !req.body ||
    typeof req.body !== "object" ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({
      success: false,
      message: "Request body is required.",
    });
  }

  if (typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({
      success: false,
      message: "Title and content must be strings.",
    });
  }

  if (!title.trim() || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required.",
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateNote,
};
