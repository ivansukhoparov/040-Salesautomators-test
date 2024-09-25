import {client, urls} from "../settings";
import {btoa} from "buffer";
import {injectable} from "inversify";
import {
    CallbackHandlerType,
    OAuthDataType,
    OAuthRawResponseType,
    UserDataType,
    UserRawResponseType
} from "../types/auth.types";

@injectable()
export class AuthService {
    constructor() {
    }

    async callbackHandler(code: string): Promise<CallbackHandlerType> {
        const oauthData: OAuthDataType | null = await this.oauth(code)
        if (oauthData === null) return {success:false}
        const userData: UserDataType | null = await this.getUserData(oauthData.accessToken)
        if (userData === null) return {success:false}


        return {
            success: true,
            target: oauthData.apiDomain
        }
    }
    async createNewUser(authData:OAuthDataType,userData:UserDataType){

    }

    async getAccessToken(userId:string){

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
                createdAt:new Date().getTime()
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
            const response = await fetch('https://api.pipedrive.com/v1/users/me?api_token=YOUR_ACCESS_TOKEN', fetchInit)
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

    async refreshAccessToken(refreshToken:string){
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
}