import {Router} from "express";
import {inject, injectable} from "inversify";
import {AuthController} from "../controllers/auth.controller";

@injectable()
export class AuthRouter {
    private router = Router()

    constructor(@inject(AuthController) private authController: AuthController) {
        this.init()
    }

    init() {
        this.router.get("/callback", this.authController.auth)
    }

    get getRouter(){
        return this.router
    }
}
