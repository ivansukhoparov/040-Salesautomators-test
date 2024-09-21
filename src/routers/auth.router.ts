import {Router, Request, Response} from "express";

export const authRouter = Router()

authRouter.get("/callback", async (req:Request, res:Response) => {
    res.status(200).send(req)
})