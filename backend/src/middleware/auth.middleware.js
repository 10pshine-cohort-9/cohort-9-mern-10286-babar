const { verifyToken } = require("../utils/jwt");
const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Authorization token is required.", 401));
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return next(new AppError("Invalid authorization format.", 401));
  }

  const token = parts[1];
  let payload;

  try {
    payload = verifyToken(token);
  } catch (error) {
    return next(new AppError("Invalid or expired token.", 401));
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return next(new AppError("User not found.", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  authenticate,
};