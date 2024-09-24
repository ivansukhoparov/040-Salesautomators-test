import express, {NextFunction, Request, Response} from "express";
import {homeRouter} from "./routers/home.router";
import {authRouter} from "./routers/auth.router";
import {uiRouter} from "./routers/ui.router";


export const app = express()
app.use(express.json());

app.use("/", homeRouter)
app.use("/auth", authRouter)
app.use("/ui", uiRouter)

