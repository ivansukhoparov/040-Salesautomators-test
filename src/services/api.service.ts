import {inject, injectable} from "inversify";
import {AuthService} from "./auth.service";

@injectable()
export class ApiService{

    constructor(@inject(AuthService) private authService:AuthService) {
    }

    async createNewJob(userId:number, createJobDto:any ){
        const accessToken:string|null = await this.authService.getAccessToken(userId)
        if (!accessToken) return false


        return true
    }
}