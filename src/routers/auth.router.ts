import {Router, Request, Response} from "express";

export const authRouter = Router()

authRouter.post("/callback", async (req:Request, res:Response) => {
console.log(req.body)
})