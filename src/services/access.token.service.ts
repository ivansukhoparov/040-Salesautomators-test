import {inject, injectable} from "inversify";
import {AuthService} from "./auth.service";

@injectable()
export class AccessTokenService{
    constructor(@inject(AuthService) public authService:AuthService) {
    }

}