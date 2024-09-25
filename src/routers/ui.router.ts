import {Request, Response, Router} from "express";
import path from "path";


export const uiRouter = Router()

uiRouter.get("/modal", async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../public/modal-new-job.html'));
})

uiRouter.get('/panel', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../public/modal-new-job.html'));
});

uiRouter.get('/hello', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../public/modal-new-job.html'));
});





