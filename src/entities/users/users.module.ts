import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Module({
    imports: [ TypeOrmModule.forFeature([Users]) ],
    exports: [ TypeOrmModule ]
})
export class UsersModule {}
