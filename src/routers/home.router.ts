import {Request, Response, Router} from "express";


export const homeRouter = Router()

homeRouter.get("/", async (req: Request, res: Response) => {
    const responseMsg = `this is test task for Salesautomators`
    res.status(200).json(responseMsg);
})
