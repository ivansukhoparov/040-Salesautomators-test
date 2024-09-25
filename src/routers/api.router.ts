import {Router} from "express";
import {ApiController} from "./controllers/api.controller";
import {container} from "../composition-root";

const apiController: ApiController = container.resolve<ApiController>(ApiController)

export const apiRouter = Router()

apiRouter.get("/new-job", apiController.newJob.bind(apiController))
