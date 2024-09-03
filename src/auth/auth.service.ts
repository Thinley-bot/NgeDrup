import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserSignUpDto } from './dto/user-signup.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>) {}

  async register(registerUserDto: UserSignUpDto) {
    const { password,email,firstname,middlename,lastname} = registerUserDto;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) { 
        throw new BadRequestException('User is already exist'); 
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const registerResponse = await this.userRepository.save({firstname,middlename,lastname,email,password:hashedPassword});
      return {
        message: 'User registered successfully',
      };
    } catch (error) {
        return `Failed to save user ${error.message}`
    }
  }
}
