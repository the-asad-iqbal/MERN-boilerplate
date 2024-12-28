import User from "../models/userModel.js";
import { successResponse, errorResponse } from "../lib/responseHandler.js";
import { parseTimeToMs } from "../lib/utils.js";
import {
  generateVerificationToken,
  setAuthCookie,
  setRefreshCookie,
} from "../lib/utils.js";
import { sendActivationEmail } from "../lib/emailService.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    successResponse(res, 200, "Fetched all users!", users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return errorResponse(res, 400, "Please provide user id");

    const user = await User.findById(id).select("-password");
    if (!user) {
      return errorResponse(res, 404, "Cannot find user with this id.");
    }

    successResponse(res, 200, user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, "Please provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, 404, "Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const authToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    setRefreshCookie(res, refreshToken);
    setAuthCookie(res, authToken);

    successResponse(res, 200, "Login successful", {
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return errorResponse(
        res,
        400,
        "Please provide name, email, and password"
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(
        res,
        400,
        "An account with this email already exists"
      );
    }

    const user = await User.create({ name, email, password });
    if (!user) return next(error);

    user.verificationToken = generateVerificationToken();

    user.verificationTokenExpires = new Date(
      Date.now() + parseTimeToMs(process.env.VERIFICATION_TOKEN_EXPIRATION)
    );

    await user.save();

    const activationUrl = `${process.env.CLIENT_URL}/verify-email/${user.verificationToken}`;
    await sendActivationEmail(email, activationUrl);

    successResponse(res, 201, "Successfully registered!", {
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("authToken");
    res.clearCookie("refreshToken");
    successResponse(res, 200, "Logout successful");
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    successResponse(res, 200, "You are authenticated!", req.user);
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return errorResponse(res, 404, "Invalid token");
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    successResponse(res, 200, "Account activated successfully!");
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUserById, login, register, logout, me, verifyEmail };
