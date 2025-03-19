import User from "../models/User.js";

// Busca o usuário pelo e-mail
export const findUserByEmail = (email) =>
  User.findOne({ email }).select("+password");

export default { findUserByEmail };
