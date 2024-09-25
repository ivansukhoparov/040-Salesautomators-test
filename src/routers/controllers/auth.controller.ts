import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {AuthService} from "../../services/auth.service";


@injectable()
export class AuthController {
    constructor(@inject(AuthService) protected authService: AuthService) {

    }

    async newAuth(req: Request, res: Response) {

        const code:string = String(req.query.code)
        if (code) {
            const auth = await this.authService.callbackHandler(code)
            if (auth.success && auth.target) {
                res.status(200).redirect(auth.target)
            } else {
                res.status(401).send("unauthorised")
            }
        } else {
            res.status(400).send("no code")
        }

    }
}