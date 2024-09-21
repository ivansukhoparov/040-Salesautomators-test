import {Router, Request, Response} from "express";

export const authRouter = Router()

authRouter.post("/auth", async (req:Request, res:Response) => {
console.log(req.body)
})