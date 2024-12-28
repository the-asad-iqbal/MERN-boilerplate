import jwt from "jsonwebtoken";
import { requiredEnvVars } from "../config/envConfig.js";
import crypto from "crypto";

/**
 * Converts time string to milliseconds
 * @param {string} timeStr - Time string (e.g., "7d", "15m", "24h")
 * @returns {number} Time in milliseconds
 */
const parseTimeToMs = (timeStr) => {
  const value = parseInt(timeStr);
  const unit = timeStr.slice(-1).toLowerCase();

  const units = {
    s: 1000,
    m: 1000 * 60,
    h: 1000 * 60 * 60,
    d: 1000 * 60 * 60 * 24,
    w: 1000 * 60 * 60 * 24 * 7,
    M: 1000 * 60 * 60 * 24 * 30,
    y: 1000 * 60 * 60 * 24 * 365,
  };

  return value * (units[unit] || 0);
};

/**
 * Verifies a JWT refresh token
 * @param {string} refreshToken - The refresh token to verify
 * @returns {Object} The decoded token payload
 * @throws {JsonWebTokenError} If token is invalid
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

/**
 * Verifies a JWT auth token
 * @param {string} authToken - The authentication token to verify
 * @returns {Object} The decoded token payload
 * @throws {JsonWebTokenError} If token is invalid
 */
const verifyAuthToken = (token) => {
  return jwt.verify(token, process.env.JWT_AUTH_SECRET);
};

/**
 * Sets a refresh token cookie in the response
 * @param {Response} res - Express response object
 * @param {string} refreshToken - The refresh token to set in cookie
 * @param {Object} options - Additional cookie options
 * @returns {void}
 */
const setRefreshCookie = (res, refreshToken, options) => {
  const expiryTime = parseTimeToMs(process.env.JWT_REFRESH_EXPIRATION || "7d");
  res.cookie("refreshToken", refreshToken, {
    ...options,
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + expiryTime),
  });
};

/**
 * Sets an authentication token cookie in the response
 * @param {Response} res - Express response object
 * @param {string} authToken - The authentication token to set in cookie
 * @param {Object} options - Additional cookie options
 * @returns {void}
 */
const setAuthCookie = (res, authToken, options) => {
  const expiryTime = parseTimeToMs(process.env.JWT_AUTH_EXPIRATION || "15m");
  res.cookie("authToken", authToken, {
    ...options,
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + expiryTime),
  });
};

/**
 * Validates that all required environment variables are defined
 * @throws {Error} If any required environment variables are not defined
 * @returns {void}
 */
const validateEnv = () => {
  const missingKeys = requiredEnvVars.filter((key) => !process.env[key]);
  if (missingKeys.length > 0) {
    console.error(
      `Missing environment variables: ${missingKeys.join(", ")}\n` +
        "Please add the following variables to your .env file:\n" +
        requiredEnvVars
          .map((key) => `# ${key}="${process.env[key] || ""}"`)
          .join("\n")
    );
    process.exit(1);
  }
};

const generateVerificationToken = () => {
  const token = crypto.randomBytes(64).toString("hex");
  return token;
};

const validateUserInput = ({ name, email, password }) => {
  if ((!name && name !== undefined) || !email || !password) {
    throw new Error("Missing required fields");
  }
};

const createActivationUrl = (token) =>
  `${process.env.CLIENT_URL}/verify-email/${token}`;

export {
  verifyRefreshToken,
  verifyAuthToken,
  setRefreshCookie,
  setAuthCookie,
  validateEnv,
  generateVerificationToken,
  parseTimeToMs,
  validateUserInput,
  createActivationUrl,
};
