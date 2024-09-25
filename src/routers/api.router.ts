import {Request, Response, Router} from "express";
import {inject, injectable} from "inversify";
import {ApiService} from "../services/api.service";
import {ApiController} from "../controllers/api.controller";

@injectable()
export class ApiRouter {
    private router = Router()

    constructor(@inject(ApiController) private apiController: ApiController) {
        this.init()
    }

    init() {
        this.router.post("/new-job", this.apiController.newJob)
    }

    get getRouter() {
        return this.router
    }
}