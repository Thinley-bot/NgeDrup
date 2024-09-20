import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly categoryRepository:Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto,currentUser:User) {
    try{
    let createResponse=await this.categoryRepository.create(createCategoryDto);
    createResponse.addedBy=currentUser;
    await this.categoryRepository.save(createResponse);
    return "Category created successfully."
    }
    catch(error){ return error.message }
  }

  async findAll() {
    return this.categoryRepository.find({ relations:{addedBy:true} });
  }

  async findOne(id: number) {
    try{
      const existingCategory = await this.categoryRepository.findOne({ where:{id},relations:["addedBy"] })
      if(!existingCategory){
        return "The category doesn't exist."
      }
      return existingCategory;
    }
    catch(error){ return error.message }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try{
      const existingCategory = await this.findOne(id);
      if(!existingCategory) { return new NotFoundException("The category Doesn't exist.") }
      const updateCategoryData=await this.categoryRepository.merge(existingCategory,updateCategoryDto);
      const updateCategoryResponse = await this.categoryRepository.save(updateCategoryData);
      if(!updateCategoryResponse){
        return "Updating category failed"
      }
      return "Category updated successfully."
    }
    catch(error){ return error.message }
  }

  async remove(id: number) {
    const existingCategory = await this.findOne(id);
    if(!existingCategory){
      return new NotFoundException("The category Doesn't exist.")
    }
    return await this.categoryRepository.remove(existingCategory);
  }
}
