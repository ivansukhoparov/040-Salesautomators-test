import {client, urls} from "../settings";
import {btoa} from "buffer";
import {inject, injectable} from "inversify";
import {
    CallbackHandlerType,
    OAuthDataType,
    OAuthRawResponseType,
    RefreshTokenDataType,
    UserDataType,
    UserRawResponseType
} from "../types/auth.types";
import {AuthRepository} from "../repositories/auth.repository";
import {ApiService} from "./api.service";
import {newDealFields} from "../utils/job.fields";

@injectable()
export class AuthService {
    constructor(@inject(AuthRepository) private authRepository: AuthRepository,
    ) {

    }

    async callbackHandler(code: string) {
        const oauthData: OAuthDataType | null = await this.oauth(code)
        if (oauthData === null) return {success: false, target: null}

        const isCreated = await this.authRepository.createUser(oauthData)
        if (!isCreated) return {success: false, target: null}

        const appFieldsAdded = await this.initJobFields(oauthData.apiDomain)
        if (!appFieldsAdded) return {success: false, target: null}
        return {
            success: true,
            target: oauthData.apiDomain
        }
    }

    async getAccessToken(apiDomain: string) {
        const currentTime = new Date().getTime()

        const user = await this.authRepository.getUser(apiDomain)
        if (user === null) return null

        if (user.expiresAt < currentTime) {
            const refreshedToken: RefreshTokenDataType | null = await this.refreshAccessToken(user.refreshToken)
            if (refreshedToken === null) return null
            const isUpdated = await this.authRepository.updateTokens(refreshedToken, currentTime, apiDomain)
            if (!isUpdated) return null

            return {
                accessToken: refreshedToken.accessToken,
                target: user.apiDomain
            }
        } else {
            return {
                accessToken: user.accessToken,
                target: user.apiDomain
            }
        }
    }

    async oauth(code: string): Promise<OAuthDataType | null> {
        try {
            const formData = new URLSearchParams();
            formData.append('grant_type', 'authorization_code');
            formData.append('code', `${code}`);
            formData.append('redirect_uri', urls.client.callback);

            const credentials = btoa(`${client.id}:${client.secret}`)
            const fetchInit: RequestInit = {
                method: 'POST',
                body: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + credentials
                }
            }

            const response = await fetch(urls.api.authUrl, fetchInit)
            const authResponseRaw: OAuthRawResponseType = await response.json()

            return {
                accessToken: authResponseRaw.access_token,
                expiresIn: authResponseRaw.expires_in,
                refreshToken: authResponseRaw.refresh_token,
                apiDomain: authResponseRaw.api_domain,
                createdAt: new Date().getTime()
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async getUserData(accessToken: string): Promise<UserDataType | null> {
        try {
            const fetchInit: RequestInit = {
                method: 'GET',
            }
            const response = await fetch(`https://api.pipedrive.com/v1/users/me?api_token=${accessToken}`, fetchInit)
            const userResponseRaw: UserRawResponseType = await response.json()

            return {
                userId: userResponseRaw.data.id,
                name: userResponseRaw.data.name,
                email: userResponseRaw.data.email,
                companyId: userResponseRaw.data.company_id,
                locale: userResponseRaw.data.locale
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async refreshAccessToken(refreshToken: string): Promise<RefreshTokenDataType | null> {
        try {
            const formData = new URLSearchParams();
            formData.append('grant_type', 'refresh_token');
            formData.append('refresh_token', `${refreshToken}`);

            const credentials = btoa(`${client.id}:${client.secret}`)
            const fetchInit: RequestInit = {
                method: 'POST',
                body: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + credentials
                }
            }

            const response = await fetch(urls.api.authUrl, fetchInit)
            const authResponseRaw: OAuthRawResponseType = await response.json()

            return {
                accessToken: authResponseRaw.access_token,
                expiresIn: authResponseRaw.expires_in,
                refreshToken: authResponseRaw.refresh_token,
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async initJobFields(apiDomain: string):Promise<boolean> {
        const accessToken = await this.getAccessToken(apiDomain)
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

        const response = await fetch(`${accessToken.target}/api/v1/deals?api_token=${accessToken.accessToken}`, fetchInit)

        const result = await response.json()
        console.log("initJobFields",result)

        return result.success
    }
}