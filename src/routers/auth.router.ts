import {Request, Response, Router} from "express";
import {client} from "../settings";
import {btoa} from "buffer";

const authUrl = "https://oauth.pipedrive.com/oauth/token"

export const authRouter = Router()

authRouter.get("/callback", async (req: Request, res: Response) => {
    const code = req.query.code
    if (code) {

        const authData = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "https://040-salesautomators-test.vercel.app/auth/callback",
        }
        const credentials  = btoa(`${client.id}:${client.secret}`)

        const fetchData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + credentials
            },
            body: JSON.stringify(authData),
        }

        console.log(fetchData)

        const token = await fetch(authUrl, fetchData)

        console.log("token", token)
        console.log("token", token.body)
        res.status(200).json(token)

    } else {
        res.status(400).send("no code or invalid")
    }


})