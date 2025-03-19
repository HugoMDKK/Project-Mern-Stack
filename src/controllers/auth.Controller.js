import { loginService, generateToken } from "../services/auth.service.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Delegamos a validação de login ao service
    const user = await loginService(email, password);

    // Geramos o token para o usuário autenticado
    const token = generateToken(user.id);

    // Retornamos o token para o cliente
    res.send({ token });
  } catch (err) {
    // Tratamos erros e retornamos a mensagem apropriada
    res.status(400).send({ message: err.message });
  }
};

export default { login };
