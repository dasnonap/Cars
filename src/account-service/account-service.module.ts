import { Module } from '@nestjs/common';
import { AccountServiceController } from './account-service.controller';
import { AccountServiceService } from './account-service.service';
import { UsersModule } from 'src/entities/users/users.module';
import { UsersService } from 'src/entities/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'},
    }),
  ], 
  controllers: [AccountServiceController],
  providers: [AccountServiceService, UsersService, LocalStrategy, JwtStrategy],
  exports: [AccountServiceService]
})
export class AccountServiceModule {}
