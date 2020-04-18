import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UsersModel } from 'src/DTO/users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepo: Repository<Users>
    ){}

    async findAll(): Promise<Users[]>{
        return this.usersRepo.find();
    }

    findOne(em: string): Promise<Users>{
        return this.usersRepo.findOne({where: {email: em} });
    }

    findWithUsername(name: string): Promise<Users>{
        return this.usersRepo.findOne({where: {username: name}});
    }

    findUser(user: UsersModel): Promise<Users>{
        return this.usersRepo.findOne({where: {username: user.username, password: user.password}});
    }

    async insert(user: UsersModel){
        const row = new Users();

        row.name = user.name;
        row.username = user.username;
        row.password = user.password;
        row.email = user.email;

        if(await this.exists(user.email) != 0){
            return false;
        }
    
        this.usersRepo.insert(row);

        return true;
    }

    private exists(em: string){
       return this.usersRepo.count({where: {email: em}});
    }

}
