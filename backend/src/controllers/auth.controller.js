const { registerUser, loginUser } = require("../services/auth.service");
  
const register = async (req, res) => {
    try {
      const user = await registerUser(req.body);
  
      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: user,
      });
    } catch (error) {
      const expectedErrors = [
        "Email is already registered.",
      ];
  
      return res.status(400).json({
        success: false,
        message: expectedErrors.includes(error.message)
          ? error.message
          : "Unable to register user.",
      });
    }
  };
  
  const login = async (req, res) => {
    try {
      const result = await loginUser(req.body);
  
      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
  };

module.exports = {
    register,
    login,
};
