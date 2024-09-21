import express from "express"
import {app} from "./app";
export const version = "0.0.4"

const port = 3002

app.listen(port, async ()=>{
    console.log(`app start on port ${port}`);
    console.log(`open in browser http://localhost:${port}`);
})

