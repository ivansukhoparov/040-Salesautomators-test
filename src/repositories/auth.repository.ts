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
    constructor(@inject(MongoDbAdapter) private db: MongoDbAdapter) {
    }

    async createUser(authData: OAuthDataType, userData: UserDataType): Promise<boolean> {
        try {
            const createUserDto: AuthDBModel = {
                userId: userData.userId,
                name: userData.name,
                email: userData.email,
                companyId: userData.companyId,
                locale: userData.locale,
                accessToken: authData.accessToken,
                expiresAt: authData.expiresIn + authData.createdAt,
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

    async updateTokens(authData: RefreshTokenDataType, createdAt:number, userId: number): Promise<boolean> {
        try {
            const updateDto: UpdateTokenModel = {
                accessToken: authData.accessToken,
                expiresAt: authData.expiresIn + createdAt,
                refreshToken: authData.refreshToken,
            }
            const result: UpdateResult<AuthDBModel> = await this.db
                .connect
                .collection<AuthDBModel>("users")
                .updateOne({userId: userId}, {$set: updateDto})
            return result.matchedCount === 1
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async getUser(userId: number): Promise<UserType | null> {
        try {
            const user: WithId<AuthDBModel> | null = await this.db
                .connect
                .collection<AuthDBModel>("users")
                .findOne({userId: userId})
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