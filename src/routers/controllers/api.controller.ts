import {inject, injectable} from "inversify";
import {ApiService} from "../../services/api.service";
import {Request, Response} from "express";

@injectable()
export class ApiController {

    constructor(@inject(ApiService) protected apiService: ApiService) {
        console.log("apiService", this.apiService)
    }

    async newJob(req: Request, res: Response) {
        console.dir(this)
        console.log(this.apiService)
        // const {userId} = req.query
        // const newJobRawDto:newJobRawType = req.body
        // const isCreated = await this.apiService.createNewJob(Number(userId), newJobRawDto)
    }


}