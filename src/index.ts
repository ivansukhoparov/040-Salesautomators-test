import express from "express"
import {app} from "./app";


const port = 3002

app.listen(port, async ()=>{
    console.log(`app start on port ${port}`);
    console.log(`open in browser http://localhost:${port}`);
})

