import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/create", userController.create);
userRouter.get("/", authMiddleware, userController.findAll);
userRouter.get("/:id", authMiddleware, validId, validUser, userController.findById);
userRouter.patch("/:id", authMiddleware, validId, validUser, userController.update);

export default userRouter;
