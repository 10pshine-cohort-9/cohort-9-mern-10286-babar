const bcrypt = require("bcrypt");

const prisma = require("../config/prisma");
const { generateToken } = require("../utils/jwt");

const SALT_ROUNDS = 10;

const registerUser = async ({ name, email, password }) => {
  try {
    const normalizedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      throw new Error("Email is already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    if (error.message === "Email is already registered.") {
      throw error;
    }

    throw new Error("Failed to register user.");
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    const token = generateToken({
      id: user.id,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    if (error.message === "Invalid email or password.") {
      throw error;
    }

    throw new Error("Failed to login user.");
  }
};

module.exports = {
  registerUser,
  loginUser,
};