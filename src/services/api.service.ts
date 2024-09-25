import {inject, injectable} from "inversify";
import {AuthService} from "./auth.service";
import {newJobRawType} from "../types/job.types";
import {newDealFields} from "../utils/job.fields";
import {AuthRepository} from "../repositories/auth.repository";
import {AccessTokenService} from "./access.token.service";

@injectable()
export class ApiService {

    constructor(@inject(AccessTokenService) private accessTokenService: AccessTokenService) {
    }

    async createNewJob(apiDomain: string, createJobRawDto: newJobRawType) {
        const accessToken = await this.accessTokenService.authService.getAccessToken(apiDomain)
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




}