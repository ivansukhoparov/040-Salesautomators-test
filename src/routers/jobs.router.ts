import express, {Request, Response, Router} from "express";
import {appVersion} from "../version";
import * as fs from "fs";
import {newJobForm} from "../forms/new.job.form";

export const jobsRouter = Router()

jobsRouter.get("/form", async (req: Request, res: Response) => {
    const responseMsg = `this is test task for Salesautomators v.${appVersion}`
    res.status(200)
    res.send(newJobForm);
})

