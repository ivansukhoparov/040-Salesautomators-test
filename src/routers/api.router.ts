import {Request, Response, Router} from "express";
import {injectable} from "inversify";

@injectable()
export class ApiRouter{
   private router = Router()

    constructor() {
       this.init()
    }

   init(){
      this.router.post("/new-job", async (req: Request, res: Response) => {
           console.log(req.query)
           console.log(req.body)
       })
   }

   get getRouter(){
       return this.router
   }
}