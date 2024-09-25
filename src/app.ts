import express, {NextFunction, Request, Response} from "express";
import {uiRouter} from "./routers/ui.router";
import {homeRouter} from "./routers/home.router";
import {authRouter} from "./routers/auth.router";
import {apiRouter} from "./routers/api.router";


export const app = express()


app.use("/", homeRouter)
app.use("/auth", authRouter)
app.use("/ui", uiRouter)
app.use("/api", apiRouter)


app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    res
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Request-Method', '*')
        .setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET,POST,PUT,DELETE')
        .setHeader('Access-Control-Allow-Headers', '*')
    next()
})
