import {Request, Response, Router} from "express";
import path from "path";
import {injectable} from "inversify";
import {appVersion} from "../version";


@injectable()
export class UiRouter {
    private router = Router()

    constructor() {
        this.init()
    }

    init() {
        this.router.get("/modal", async (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../../public/modal-new-job.html'));
        })

        this.router.get('/panel', async (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../../public/modal-new-job.html'));
        });

        this.router.get('/hello', async (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../../public/modal-new-job.html'));
        });
    }

    get getRouter(){
        return this.router
    }
}



