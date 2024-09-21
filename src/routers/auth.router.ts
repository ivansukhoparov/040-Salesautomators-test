import {Router, Request, Response} from "express";

export const authRouter = Router()

authRouter.get("/callback", async (req:Request, res:Response) => {
    console.log(res)
    res.status(200).send("installed")
})