import User from "../models/userModel.js";
import { successResponse, errorResponse } from "../lib/responseHandler.js";
import { setAuthCookie, setRefreshCookie } from "../lib/utils.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    successResponse(res, 200, users);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return errorResponse(res, 400, "Please provide user id");

    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, user);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, "Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 401, "Invalid credentials");
    }
    
    const authToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    setRefreshCookie(res, refreshToken);
    setAuthCookie(res, authToken);

    successResponse(res, 200, "Login successful");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const register = async (req, res) => {
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
    if (!user) return errorResponse(res, 400, "User not created");

    const authToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    setRefreshCookie(res, refreshToken);
    setAuthCookie(res, authToken);

    successResponse(res, 201, "Successfully registered!");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.clearCookie("refreshToken");
    successResponse(res, 200, "Logout successful");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export { getAllUsers, getUserById, login, register, logout };
