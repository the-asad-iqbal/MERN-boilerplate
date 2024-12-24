import User from "../models/userModel.js";
import { verifyRefreshToken, verifyAuthToken } from "../lib/utils.js";

const isLoggedIn = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = decoded;

    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { authToken } = req.cookies;

    if (!authToken) {
      const newAuthToken = user.generateAuthToken();
      res.cookie("authToken", newAuthToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { isLoggedIn };
