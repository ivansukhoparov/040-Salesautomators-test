import {Request, Response, Router} from "express";
import {appVersion} from "../version";

export const homeRouter = Router()

homeRouter.get("/", async (req: Request, res: Response) => {
    const responseMsg = `this is test task for Salesautomators v.${appVersion}`
    res.status(200).json(responseMsg);
})