import express, {NextFunction,Response,Request} from "express";
import {homeRouter} from "./routers/home.router";
import {authRouter} from "./routers/auth.router";
import {jobsRouter} from "./routers/jobs.router";


    export const app = express()
    app.use(express.json())
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
            .setHeader('Access-Control-Request-Method', '*')
            .setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET,POST,PUT,DELETE')
            .setHeader('Access-Control-Allow-Headers', '*')
        next()
    })
// app.use(
//
//
// )
    app.use("/", homeRouter)
    app.use("/auth", authRouter)
    app.use("/jobs", jobsRouter)

