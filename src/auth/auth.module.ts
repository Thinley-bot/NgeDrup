import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Module({
    imports:[TypeOrmModule.forFeature([User]),PassportModule],
    providers:[AuthService,LocalStrategy,JwtStrategy,UsersService],
    controllers:[AuthController]
})
export class AuthModule {}
