import {inject, injectable} from "inversify";
import {AuthService} from "./auth.service";
import {newJobRawType} from "../types/job.types";
import {newDealFields} from "../utils/job.fields";
import {AuthRepository} from "../repositories/auth.repository";

@injectable()
export class ApiService {

    constructor(@inject(AuthService) private authService: AuthService) {
    }

    async createNewJob(userId: number, createJobRawDto: newJobRawType) {
        const accessToken = await this.authService.getAccessToken(userId)
        if (!accessToken) return false

        const newJobDto = {
            // title: string
            // value: string
            // label: [number],
            // currency: string
            // user_id: number
            // person_id: number
            // org_id: number
            // pipeline_id: number
            // stage_id: number
            // status: string
            // origin_id: string
            // channel: number
            // channel_id: string
            // add_time: string
            // won_time: string
            // lost_time: string
            // close_time: string
            // expected_close_date: Date,
            // probability: number,
            // lost_reason: string
            // visible_to: string
        }
        return true
    }


    async initJobFields(userId: number) {
        const accessToken = await this.authService.getAccessToken(userId)
        if (!accessToken) return false

        const fetchInit: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newDealFields),
            redirect: "follow"
        };

        const response = await fetch(`https://${accessToken.target}/api/v1/deals?api_token=${accessToken.accessToken}`, fetchInit)

        const result = await response.json()
        return result.success
    }

}