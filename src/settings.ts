import dotenv from "dotenv";

dotenv.config();

export const client = {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    url:process.env.CALLBACK_URL
}