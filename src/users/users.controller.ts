import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserId } from './types/create-user.type';
import { JWTAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const {confirmpassword, ...createUser}=createUserDto;
    return this.usersService.create(createUser);
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UserId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UserId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id:UserId) {
    return this.usersService.remove(id);
  }
}
