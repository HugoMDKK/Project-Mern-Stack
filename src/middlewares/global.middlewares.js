import mongoose from "mongoose";
import userService from "../services/user.service.js";
import userRepositories from "../repositories/user.repositories.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Id" });
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userRepositories.findByIdUserRepository(id);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validCreateNews = (req, res, next) => {
  const { title, text, banner } = req.body;

  // Verifica se os campos essenciais estão presentes
  if (!title || !banner || !text) {
    return res.status(400).send({
      message: "Submit all fields for registration the news",
    });
  }

  // Se tudo estiver ok, passa o controle para a próxima função (create)
  next();
};

export const validUpdateNews = (req, res, next) => {
  const { title, text, banner } = req.body;

  // Verifica se pelo menos um dos campos foi enviado
  if (!title && !text && !banner) {
    return res.status(400).send({
      message: "Submit at least one field to update the News",
    });
  }

  // Se passou na validação, chama `next()` para continuar
  next();
};
