import { Router } from "express";

// Importação dos controladores
import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  update,
  erase,
  likeNews,
  addComment,
  deleteComment,
  byUser,
} from "../controllers/news.controller.js";

// Importação dos middlewares
import {
  validCreateNews,
  validId,
  validUpdateNews,
} from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Rotas públicas (não requerem autenticação)
router.get("/", findAll); // Lista todas as notícias com paginação
router.get("/top", topNews); // Busca a notícia mais recente
router.get("/search", searchByTitle); // Busca notícias por título

// Middleware de autenticação (protege as rotas abaixo)
router.use(authMiddleware);

// Rotas protegidas (requerem autenticação)
router.post("/", validCreateNews, create); // Cria uma nova notícia
router.get("/byUser", byUser); // Lista notícias do usuário autenticado

// Middleware para validação de ID em rotas com parâmetros
router.use("/:id", validId);

// Rotas baseadas em ID
router.get("/:id", findById); // Busca uma notícia por ID
router.patch("/:id", validUpdateNews, update); // Atualiza uma notícia por ID
router.delete("/:id", erase); // Remove uma notícia por ID
router.patch("/like/:id", likeNews); // Adiciona ou remove like de uma notícia
router.patch("/comment/:id", addComment); // Adiciona um comentário a uma notícia
router.patch("/comment/:idNews/:idComment", deleteComment); // Remove um comentário específico

export default router;