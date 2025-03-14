import { Router } from "express";
const newsRouter = Router();

import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
  likeNews,
  addComment,
  deleteComment,
} from "../controllers/news.controller.js";
import {
  validCreateNews,
  validId,
  validUpdateNews,
} from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

newsRouter.get("/", findAll);
newsRouter.get("/top", topNews);
newsRouter.get("/search", searchByTitle);

newsRouter.use(authMiddleware);
newsRouter.post("/", validCreateNews, authMiddleware, create);

newsRouter.use(validId);
newsRouter.get("/byUser", authMiddleware, byUser);
newsRouter.get("/:id", authMiddleware, findById);
newsRouter.patch("/:id", validUpdateNews, authMiddleware, update);
newsRouter.delete("/:id", authMiddleware, erase);
newsRouter.patch("/like/:id", authMiddleware, likeNews);
newsRouter.patch("/comment/:id", authMiddleware, addComment);
newsRouter.patch("/comment/:idNews/:idComment", authMiddleware, deleteComment);

export default newsRouter;
