import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserType, UserId } from './types/create-user.type';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}

  async create(createUser: CreateUserType):Promise<string> {
    try{
      const createResponse = await this.userRepository.save( createUser )
      if(createResponse){return "User Created Succesfully."}
    }
    catch ( error ) {return `User creation failed ${error.message}`}
  }

  async findAll():Promise<User[] | string> {
    try{ return await this.userRepository.find() }
    catch(error){ return error.message }
  }

  async findOne(id?: User['id'], email?: string) {
    try {
      const whereClause = {};
      
      if (id) {
        whereClause['id'] = id;
      }
      if (email) {
        whereClause['email'] = email;
      }
      
      return await this.userRepository.findOne({ where: whereClause });
    } catch (error) {
      return error.message;
    }
  }
    
  update(id:UserId, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id:UserId) {
    return `This action removes a #${id} user`;
  }
}
