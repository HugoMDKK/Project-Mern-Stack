import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  validCreateNews,
  validUpdateNews,
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", validCreateNews, authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", validUpdateNews, authMiddleware, update);

export default router;
