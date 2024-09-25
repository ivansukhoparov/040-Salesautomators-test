import {Container} from "inversify";

import {MongoDbAdapter} from "./bd/mongodb.adapter";

import {AuthService} from "./services/auth.service";
import {AuthController} from "./controllers/auth.controller";

import {AuthRouter} from "./routers/auth.router";
import {ApiRouter} from "./routers/api.router";
import {UiRouter} from "./routers/ui.router";
import {HomeRouter} from "./routers/home.router";

import {App} from "./app";
import {AuthRepository} from "./repositories/auth.repository";
import {ApiService} from "./services/api.service";
import {ApiController} from "./controllers/api.controller";


export const container = new Container()

container.bind<MongoDbAdapter>(MongoDbAdapter).toSelf().inSingletonScope()

container.bind<AuthRepository>(AuthRepository).toSelf().inSingletonScope()


container.bind<AuthService>(AuthService).toSelf().inSingletonScope()
container.bind<ApiService>(ApiService).toSelf().inSingletonScope()

container.bind<AuthController>(AuthController).toSelf().inSingletonScope()
container.bind<ApiController>(ApiController).toSelf().inSingletonScope()

container.bind<AuthRouter>(AuthRouter).toSelf().inSingletonScope()
container.bind<HomeRouter>(HomeRouter).toSelf().inSingletonScope()
container.bind<ApiRouter>(ApiRouter).toSelf().inSingletonScope()
container.bind<UiRouter>(UiRouter).toSelf().inSingletonScope()

container.bind<App>(App).toSelf().inSingletonScope()
