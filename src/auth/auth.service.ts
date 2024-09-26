import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UserSignUpDto } from './dto/user-signup.dto';
import { User } from 'src/users/entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, 
  private readonly jwtService:JwtService,
private readonly usersService:UsersService) {}

  async register(registerUserDto: UserSignUpDto) {
    const { password, email, firstname, middlename, lastname } = registerUserDto;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) { 
      throw new BadRequestException('User already exists'); 
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const registerResponse = await this.userRepository.save({firstname,middlename,lastname,email,password: hashedPassword});
      return {
        message: 'User registered successfully',
      };
    } catch (error) {
      throw new BadRequestException(`Failed to save user: ${error.message}`);
    }
  }

  async validateUser(userCredentials: UserSignInDto): Promise<any> {
    const { email, password } = userCredentials;
    const user = await this.userRepository.createQueryBuilder('users').addSelect('users.password').where('users.email = :email', { email }).getOne();
    if(!user){
      return undefined
    }
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return undefined
  }

  async login(userLoginDto: UserSignInDto) {
    const existingUser = await this.validateUser(userLoginDto);
    if (existingUser===undefined) {
      throw new UnauthorizedException("Invalid email or password!");
    }
    const {email,...result}=existingUser;
    return this.jwtService.sign({email})
  }

  async validateJwtUser(email:string):Promise<Object>{
    const currentUser = await this.usersService.findOne(undefined,email);
    return currentUser;
  }
}
