import {Request, Response, Router} from "express";

const version = "0.0.4"
export const homeRouter = Router()

homeRouter.get("/", async (req: Request, res: Response) => {
    const responseMsg = `this is test task for Salesautomators v.${version}`
    res.status(200).json(responseMsg);
})