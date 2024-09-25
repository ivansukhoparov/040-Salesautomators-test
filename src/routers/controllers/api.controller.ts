import {inject, injectable} from "inversify";
import {ApiService} from "../../services/api.service";
import {Request, Response} from "express";
import {newJobRawType} from "../../types/job.types";

@injectable()
export class ApiController {

    constructor(@inject(ApiService) protected apiService: ApiService) {

    }

    async newJob(req: Request, res: Response) {
        const apiDomain = "req.quer"
        console.log("req",req.query)
        const newJobRawDto:newJobRawType = req.body
        const isCreated = await this.apiService.createNewJob(apiDomain, newJobRawDto)
    }

}