import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {AuthService} from "../services/auth.service";
import {CallbackHandlerType} from "../types/auth.types";

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {
    }

    async auth(req: Request, res: Response) {
        const code:string = String(req.query.code)
        if (code) {
            const auth: CallbackHandlerType = await this.authService.callbackHandler(code)
            if (auth.success) {
                res.status(200).redirect(auth.target!)
            } else {
                res.status(401).send("unauthorised")
            }
        } else {
            res.status(400).send("no code")
        }

    }
}