import {Request, Response, Router} from "express";

export const homeRouter = Router()

homeRouter.get("/", async (req: Request, res: Response) => {
    console.log("s")
    res.status(200).json("this is test task for Salesautomators v.0.0.2");
})