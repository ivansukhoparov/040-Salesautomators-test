import exp from "constants";

export type OAuthRawResponseType =
    {
        access_token: string
        token_type: string
        expires_in: number
        refresh_token: string
        scope: string
        api_domain: string
    }

export type OAuthDataType = {
    accessToken: string
    expiresIn: number
    refreshToken: string
    apiDomain: string
    createdAt:number
}

export type UserRawResponseType = {
    success: boolean
    data: UserRawResponseDataType
}

type UserRawResponseDataType = {
    id: number
    name: string
    email: string
    company_id: number
    locale: string
    timezone_name: string
    [key: string]: any
}

export type UserDataType = {
    userId:number
    name:string
    email: string
    companyId: number
    locale: string
}

export type CallbackHandlerType = {
    success: boolean
    target?: string
}

export type AuthDBModel = {
    userId:number
    name:string
    email: string
    companyId: number
    locale: string
    accessToken: string
    expiresAt: number
    refreshToken: string
    apiDomain: string
}

export type UserType = {id:string} & AuthDBModel

export type UpdateTokenModel = {
    accessToken: string
    expiresAt: number
    refreshToken: string
}

export type RefreshTokenDataType = {
    accessToken: string
    expiresIn: number
    refreshToken: string
}
