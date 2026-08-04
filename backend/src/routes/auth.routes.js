const express = require("express");

const { register, login } = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validation.middleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

router.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;