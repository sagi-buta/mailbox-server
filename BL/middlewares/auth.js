const jwt = require("jsonwebtoken");
const SECRET = "BaNanA123"; // temp; from .env file

async function createToken(data) {
  return jwt.sign(data, SECRET, { expiresIn: "1h" });
}

async function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    throw { code: 401, message: "You are not authorized" };
  }
}

async function refreshToken() {
  return jwt.sign(data, SECRET, { expiresIn: "1h" });
}

async function verifyRequest(token) {
  // verifyToken
  // verify role
  try {
    return jwt.verify(token, SECRET);
  } catch {
    throw { code: 401, message: "You are not authorized" };
  }
}

module.exports = { createToken, verifyToken };
