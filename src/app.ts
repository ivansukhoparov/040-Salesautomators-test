import express, {NextFunction, Request, Response} from "express";
import {HomeRouter} from "./routers/home.router";
import {AuthRouter} from "./routers/auth.router";
import {UiRouter} from "./routers/ui.router";
import {ApiRouter} from "./routers/api.router";
import {inject, injectable} from "inversify";
import {MongoDbAdapter} from "./bd/mongodb.adapter";

const cors = require('cors');

@injectable()
export class App {
    private app = express()

    constructor(@inject(MongoDbAdapter) private mongoDbAdapter: MongoDbAdapter,
                @inject(ApiRouter) private apiRouter: ApiRouter,
                @inject(AuthRouter) private authRouter: AuthRouter,
                @inject(HomeRouter) private homeRouter: HomeRouter,
                @inject(UiRouter) private uiRouter: UiRouter) {
        this.init()
    }

    async start(port: number) {
        //
        await this.mongoDbAdapter.init()
        this.app.listen(port, async () => {
            console.log(`app start on port ${port}`);
            console.log(`open in browser http://localhost:${port}`);
        })
    }

    init() {
        this.initGlobalMiddlewares()
        this.initRouters()
    }

    private initRouters() {
        this.app.use("/", this.homeRouter.getRouter)
        this.app.use("/auth", this.authRouter.getRouter)
        this.app.use("/ui", this.uiRouter.getRouter)
        this.app.use("/api", this.apiRouter.getRouter)
    }

    private initGlobalMiddlewares() {
        this.app.use(express.json());

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res
                .setHeader('Access-Control-Allow-Origin', '*')
                .setHeader('Access-Control-Request-Method', '*')
                .setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET,POST,PUT,DELETE')
                .setHeader('Access-Control-Allow-Headers', '*')
            next()
        })
    }
}

