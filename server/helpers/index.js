const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPass = (password) => bcrypt.hashSync(password, 8);
const comparePass = (password, hash) => bcrypt.compareSync(password, hash);

const createToken = (payload) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET);
};
const readPayload = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  hashPass,
  comparePass,
  createToken,
  readPayload,
};
