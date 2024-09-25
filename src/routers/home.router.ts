import {Request, Response, Router} from "express";
import {inject, injectable} from "inversify";

@injectable()
export class HomeRouter {
    private router = Router()

    constructor() {
        this.init()
    }

    init() {
        this.router.get("/", async (req: Request, res: Response) => {
            const responseMsg = `this is test task for Salesautomators`
            res.status(200).json(responseMsg);
        })
    }

    get getRouter(){
        return this.router
    }
}