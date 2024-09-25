import {inject, injectable} from "inversify";
import {MongoDbAdapter} from "../bd/mongodb.adapter";
import {
    AuthDBModel,
    OAuthDataType,
    RefreshTokenDataType,
    UpdateTokenModel,
    UserDataType,
    UserType
} from "../types/auth.types";
import {InsertOneResult, ObjectId, UpdateResult, WithId} from "mongodb";

@injectable()
export class AuthRepository {
    constructor(@inject(MongoDbAdapter) protected db: MongoDbAdapter) {
    }

    async createUser(authData: OAuthDataType): Promise<boolean> {
        try {
            const createUserDto: AuthDBModel = {
                accessToken: authData.accessToken,
                expiresAt: authData.expiresIn*1000 + authData.createdAt,
                refreshToken: authData.refreshToken,
                apiDomain: authData.apiDomain,
            }
            const result: InsertOneResult<AuthDBModel> = await this.db
                .connect
                .collection<AuthDBModel>("users")
                .insertOne(createUserDto)
            return !!result.insertedId;
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async updateTokens(authData: RefreshTokenDataType, createdAt:number, apiDomain: string): Promise<boolean> {
        try {
            const updateDto: UpdateTokenModel = {
                accessToken: authData.accessToken,
                expiresAt: authData.expiresIn + createdAt,
                refreshToken: authData.refreshToken,
            }
            const result: UpdateResult<AuthDBModel> = await this.db
                .connect
                .collection<AuthDBModel>("users")
                .updateOne({apiDomain: apiDomain}, {$set: updateDto})
            return result.matchedCount === 1
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async getUser(apiDomain: string): Promise<UserType | null> {
        try {
            const user: WithId<AuthDBModel> | null = await this.db
                .connect
                .collection<AuthDBModel>("users")
                .findOne({apiDomain: apiDomain})
            if (user) {
                return this._mapper(user)
            } else {
                return null
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }

    private _mapper(input: any): any {
        const keys = Object.keys(input);
        return keys.reduce((acc: any, key: string) => {
            if (key === '_id') acc.id = input._id.toString();
            else acc[key] = input[key];
            return acc;
        }, {});
    }

    private _toDbIdMapper(input: any):any {
        const keys = Object.keys(input);
        return keys.reduce((acc: any, key: string) => {
            if (key === 'id') {
                acc._id = new ObjectId(input.id as string);
            } else acc[key] = input[key];
            return acc;
        }, {});
    }
}