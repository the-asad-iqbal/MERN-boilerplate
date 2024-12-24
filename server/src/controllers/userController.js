import User from "../models/userModel.js";
import { successResponse, errorResponse } from "../lib/responseHandler.js";

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
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const authToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    res.cookie("authToken", authToken);
    res.cookie("refreshToken", refreshToken);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, getUserById, login, register };
