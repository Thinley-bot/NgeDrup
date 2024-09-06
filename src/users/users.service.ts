import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserType, UserId } from './types/create-user.type';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(createUser: CreateUserType): Promise<string> {
    try {
      const createResponse = await this.userRepository.save(createUser)
      if (createResponse) { return "User Created Succesfully." }
    }
    catch (error) { return `User creation failed ${error.message}` }
  }

  async findAll(): Promise<User[] | string> {
    try { return await this.userRepository.find() }
    catch (error) { return error.message }
  }

  async findOne(id?: UserId, email?: string) {
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

  async update(id: UserId, updateUserDto: UpdateUserDto) {
    const existingUser = this.userRepository.findOne({ where: { id } })
    try {
      const updateResponse = this.userRepository.save({ ...existingUser, ...updateUserDto })
      if (updateResponse) {
        return "User successfully updated."
      }
    }
    catch (error) {
      return `User update failed ${error.message}`
    }
  }

  async remove(id: UserId) {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
      const removeResponse = await this.userRepository.remove(user)
      if (removeResponse) {
        return "User deleted successfully"
      }
    }
    catch (error) {
      return error.message
    }
  }
}
