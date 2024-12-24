import User from "../models/userModel.js";
import {
  verifyRefreshToken,
  verifyAuthToken,
  setAuthCookie,
} from "../lib/utils.js";
import { errorResponse } from "../lib/responseHandler.js";

const isLoggedIn = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const { id } = decoded;

    if (!id) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const { authToken } = req.cookies;

    if (!authToken) {
      const newAuthToken = user.generateAuthToken();
      setAuthCookie(res, newAuthToken);
    }

    req.user = { name: user.name, email: user.email };
    next();
  } catch (error) {
    errorResponse(res, 401, "Unauthorized");
  }
};

export { isLoggedIn };
