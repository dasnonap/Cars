import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/entities/users/users.service';
import { UsersModel } from 'src/DTO/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountServiceService {


    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ){}

    async validateUser(user: UsersModel){
        const logged = await this.usersService.findWithUsername(user.email);

        if(logged.password != user.password){
            return false; 
        }

        return true;
    }

    async login(user: any){
        const ifLogged = await this.usersService.findUser(user);

        
        if(ifLogged.id == null){
            return "no";
        }
        
        const payload = { username: user.username, name: ifLogged.name, sub: user.userID};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    
}
