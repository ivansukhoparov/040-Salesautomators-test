import {inject, injectable} from "inversify";
import {ApiService} from "../services/api.service";
import {Request, Response} from "express";

@injectable()
export class ApiController {

    constructor(@inject(ApiService) private apiService: ApiService) {
    }

    async newJob(req: Request, res: Response) {
        const {userId} = req.query
        const newJobDto = req.body
        const isCreated = await this.apiService.createNewJob(Number(userId), newJobDto)
    }
}