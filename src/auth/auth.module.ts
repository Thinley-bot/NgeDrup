import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
    imports:[TypeOrmModule.forFeature([User]),PassportModule],
    providers:[AuthService,LocalStrategy,JwtStrategy,UsersService],
    controllers:[AuthController]
})
export class AuthModule {}
