import {Request, Response, Router} from "express";
import {appVersion} from "../version";
import {inject, injectable} from "inversify";
import {AuthController} from "../controllers/auth.controller";

@injectable()
export class HomeRouter {
    private router = Router()

    constructor() {
        this.init()
    }

    init() {
        this.router.get("/", async (req: Request, res: Response) => {
            const responseMsg = `this is test task for Salesautomators v.${appVersion}`
            res.status(200).json(responseMsg);
        })
    }

    get getRouter(){
        return this.router
    }
}