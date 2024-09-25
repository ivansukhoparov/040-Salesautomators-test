import "reflect-metadata"
import {Container} from "inversify";
//Adapters
import {MongoDbAdapter} from "./bd/mongodb.adapter";
// Repository
import {AuthRepository} from "./repositories/auth.repository";
// Services
import {AuthService} from "./services/auth.service";
import {ApiService} from "./services/api.service";
// Controllers
import {AuthController} from "./routers/controllers/auth.controller";
import {ApiController} from "./routers/controllers/api.controller";
import {AccessTokenService} from "./services/access.token.service";


export const container = new Container()

//Adapters
container.bind<MongoDbAdapter>(MongoDbAdapter).toSelf() 
// Repository
container.bind<AuthRepository>(AuthRepository).toSelf() 
// Services
container.bind<AuthService>(AuthService).toSelf()
container.bind<AccessTokenService>(AccessTokenService).toSelf()
container.bind<ApiService>(ApiService).toSelf() 
// Controllers
container.bind<AuthController>(AuthController).toSelf() 
container.bind<ApiController>(ApiController).toSelf() 

