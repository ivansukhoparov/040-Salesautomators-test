import express, {NextFunction, Request, Response} from "express";
const bodyParser = require('body-parser');
import {homeRouter} from "./routers/home.router";
import {authRouter} from "./routers/auth.router";
import {uiRouter} from "./routers/ui.router";
import path from "path";


export const app = express()
app.use(express.json())
// app.use(bodyParser.json());
app.use(express.static('public'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);
app.use("/", homeRouter)
app.use("/auth", authRouter)
app.use("/ui", uiRouter)

