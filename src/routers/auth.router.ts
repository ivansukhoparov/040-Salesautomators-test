import {Request, Response, Router} from "express";
import {client} from "../settings";

const authUrl = "https://oauth.pipedrive.com/oauth/token"

export const authRouter = Router()

const authRequest = {
    "grant_type": "authorization_code",
    "code": "AUTHORIZATION_CODE",
    "redirect_uri": "YOUR_CALLBACK_URL",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
}

authRouter.get("/callback", async (req: Request, res: Response) => {
    const code = req.query.code
    if (code) {

        const token = await fetch(
            authUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        grant_type: "authorization_code",
                        code: code,
                        redirect_uri: "https://040-salesautomators-test.vercel.app/auth/callback",
                        client_id: client.id,
                        client_secret: client.secret
                    }
                ),
            })
        console.log(token)
        res.status(200).send(token)

    } else {
        res.status(400).send("no code or invalid")
    }


})