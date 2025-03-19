import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authRepository from "../repositories/auth.repositories.js";

// Serviço para buscar um usuário pelo e-mail
export const loginService = async (email, password) => {
  // Busca o usuário no banco
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("User or Password not found");
  }

  // Verifica a validade da senha
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error("User or Password not found");
  }

  return user;
};

// Serviço para gerar o token JWT
export const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.SECRET_JWT, { expiresIn: 86400 });
