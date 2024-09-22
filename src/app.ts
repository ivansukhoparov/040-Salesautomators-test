import express from "express";
import {homeRouter} from "./routers/home.router";
import {authRouter} from "./routers/auth.router";
import {jobsRouter} from "./routers/jobs.router";

export const app = express()
app.use(express.json())
app.use("/", homeRouter)
app.use("/auth", authRouter)
app.use("/jobs", jobsRouter)