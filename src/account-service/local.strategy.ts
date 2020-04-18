import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import {PassportStrategy} from "@nestjs/passport"
import { AccountServiceService } from "./account-service.service";
import { UsersModel } from "src/DTO/users.model";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private accountServ: AccountServiceService){
        super();
    }

    async validate(user: UsersModel): Promise<any>{
        const logged = this.accountServ.validateUser(user);

        if(!logged){
            throw new UnauthorizedException();
        }

        return logged;
    }
    
}