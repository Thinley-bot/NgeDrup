import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/utility/common/decorators/currentuser.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/utility/common/decorators/roles.decorators';
import { Role } from 'src/utility/common/user-roles.enum';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { User } from './entities/user.entity';
import { UserId } from './types/create-user.type';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const {confirmpassword, ...createUser}=createUserDto;
    return this.usersService.create(createUser);
  }

  @Get("all")
  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  findOne(@Param('id') id: UserId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  update(@Param('id') id: UserId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  remove(@Param('id') id:UserId) {
    return this.usersService.remove(id);
  }

  @Get("me")
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(JWTAuthGuard,RolesGuard)
  getProfile(@CurrentUser() currentUser:User){
    return currentUser
  }
}
