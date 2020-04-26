import { Controller, Post, Body, Res, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { UsersModel } from 'src/DTO/users.model';
import { UsersService } from 'src/entities/users/users.service';
import { AccountServiceService } from './account-service.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('account-service')
export class AccountServiceController {

    constructor(
        private readonly usersService: UsersService,
        private authService: AccountServiceService,
        ){};
    
    @UseGuards(JwtAuthGuard)

    @Get('profile')
    getProfile(@Req() req){
        return req.user;
    }
    
    @Post('register')
    async regUser(@Body()usr: UsersModel, @Res() res){
        
        if( await this.usersService.insert(usr) == false){
            return res.status(409).send({error: 'already registered'});
        } 
        return res.status(200).send();
    }

    
    @Post('login')
    async logUser(@Res() res, @Body()user: UsersModel){  
        return res.send( await this.authService.login(user));
    }
        
}
