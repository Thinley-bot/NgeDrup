import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/utility/common/decorators/currentuser.decorator';
import { User } from 'src/users/entities/user.entity';
import { JWTAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/utility/common/decorators/roles.decorators';
import { Role } from 'src/utility/common/user-roles.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto,@CurrentUser() currentUser:User) {
    return this.categoriesService.create(createCategoryDto,currentUser);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id') 
  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
