import {Router} from "express";
import {AuthController} from "./controllers/auth.controller";
import {container} from "../composition-root";

const authController: AuthController = container.resolve<AuthController>(AuthController)
export const authRouter = Router()

authRouter.get("/callback", authController.newAuth.bind(authController))
