import User from "../models/userModel.js";
import { successResponse, errorResponse } from "../lib/responseHandler.js";
import {
  parseTimeToMs,
  generateVerificationToken,
  setAuthCookie,
  setRefreshCookie,
  validateUserInput,
  createActivationUrl,
} from "../lib/utils.js";
import { sendActivationEmail } from "../lib/emailService.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").lean();
    successResponse(res, 200, "Fetched all users!", users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return errorResponse(res, 400, "Please provide user id");

  try {
    const user = await User.findById(id).select("-password").lean();
    if (!user) return errorResponse(res, 404, "User not found");

    successResponse(res, 200, user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    validateUserInput({ email: req.body.email, password: req.body.password });

    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const [authToken, refreshToken] = [
      user.generateAuthToken(),
      user.generateRefreshToken(),
    ];
    setRefreshCookie(res, refreshToken);
    setAuthCookie(res, authToken);

    successResponse(res, 200, "Login successful", {
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(
      error.message === "Missing required fields"
        ? errorResponse(res, 400, "Please provide email and password")
        : error
    );
  }
};

const register = async (req, res, next) => {
  try {
    validateUserInput(req.body);

    const existingUser = await User.findOne({ email: req.body.email }).lean();
    if (existingUser) {
      return errorResponse(res, 400, "Email already registered");
    }

    const user = new User({
      ...req.body,
      verificationToken: generateVerificationToken(),
      verificationTokenExpires: new Date(
        Date.now() + parseTimeToMs(process.env.VERIFICATION_TOKEN_EXPIRATION)
      ),
    });

    await user.save();
    await sendActivationEmail(
      req.body.email,
      createActivationUrl(user.verificationToken)
    );

    successResponse(res, 201, "Successfully registered!", {
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(
      error.message === "Missing required fields"
        ? errorResponse(res, 400, "Please provide name, email, and password")
        : error
    );
  }
};

const logout = async (req, res) => {
  res.clearCookie("authToken");
  res.clearCookie("refreshToken");
  successResponse(res, 200, "Logout successful");
};

const me = async (req, res) => {
  successResponse(res, 200, "You are authenticated!", req.user);
};

const verifyEmail = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return errorResponse(res, 400, "Invalid token");
  }

  try {
    const user = await User.findOneAndUpdate(
      {
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() },
      },
      {
        $set: { isVerified: true },
        $unset: { verificationToken: 1, verificationTokenExpires: 1 },
      },
      { new: true }
    );

    if (!user) {
      return errorResponse(res, 400, "Invalid token or expired");
    }

    return successResponse(res, 200, "Email verified successfully");
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUserById, login, register, logout, me, verifyEmail };
