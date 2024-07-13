import jwt from 'jsonwebtoken';

/**
 * @typedef {object} Tokens
 * @property {string} accessToken
 * @property {string} refreshToken
 */

/**
 *
 * @param {object} payload
 * @returns {Tokens}
 */
export const generateTokens = (payload) => {
  const accessToken = jwt.sign(process.env.JWT_SECRET, {
    expiresIn: payload.JWT_SECRET ? '5m' : '100d',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET,
  });

  return {
    accessToken,
    refreshToken,
  };
};

/**
 *
 * @param {string} token
 * @param {string} secret
 * @returns {any}
 */
export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret, {}, (err, decoded) => {
    if (err) return [err, null];
    return [null, decoded];
  });
};
