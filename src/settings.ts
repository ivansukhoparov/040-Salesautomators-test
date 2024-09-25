import dotenv from "dotenv";

dotenv.config();

export const client = {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
}

export const urls = {
    api: {
        authUrl: "https://oauth.pipedrive.com/oauth/token"
    },
    client: {
        callback: `${process.env.APP_URL}/auth/callback`
    },
    app: {
        mongo: process.env.MONGO_URI
    }
}