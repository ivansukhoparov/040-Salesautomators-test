import {Request, Response, Router} from "express";
import {client} from "../settings";
import {btoa} from "buffer";

const authUrl = "https://oauth.pipedrive.com/oauth/token"

export const authRouter = Router()

authRouter.get("/callback", async (req: Request, res: Response) => {
    const code = req.query.code

    if (code) {


        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', `${code}`);
        formData.append('redirect_uri', client.url + "/auth/callback");


        const credentials = btoa(`${client.id}:${client.secret}`)

        const fetchData = {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + credentials
            }
        }
        console.log(fetchData)

        const response = await fetch(authUrl, fetchData)
        const token = await response.json()
        console.log("fetch", token)
        console.log("status", response.status)

        res.status(200).json(token)

    } else {
        res.status(400).send("no code or invalid")
    }


})