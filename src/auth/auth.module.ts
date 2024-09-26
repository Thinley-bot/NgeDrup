import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
    imports:[TypeOrmModule.forFeature([User]),PassportModule],
    providers:[AuthService,LocalStrategy,JwtStrategy,UsersService],
    controllers:[AuthController]
})
export class AuthModule {}
