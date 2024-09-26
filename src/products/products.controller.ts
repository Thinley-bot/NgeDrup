import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/utility/common/decorators/currentuser.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { JWTAuthGuard } from 'src/auth/guard/jwt.guard';
import { ProductsService } from './products.service';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/utility/common/decorators/roles.decorators';
import { Role } from 'src/utility/common/user-roles.enum';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard,RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @CurrentUser() currentUser:User) {
    return this.productsService.create(createProductDto,currentUser);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
