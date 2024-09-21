import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService { 
  constructor(@InjectRepository(Product) private readonly productRepository:Repository<Product>,private readonly categoryService:CategoriesService){}
  async create(createProductDto: CreateProductDto,currentUser:User):Promise<String> {
    try{
      const category = await this.categoryService.findOne(+createProductDto.category)
      let product=await this.productRepository.create(createProductDto);
      product.addedBy=currentUser;
      product.category=category;
      await  this.productRepository.save(product)
      return "Product created successfully."
    }
    catch(error){ 
      return error.message
    }
  }

  async findAll():Promise<Product[]> {
    try{ return await this.productRepository.find({relations:{addedBy:true,category:true}}) }
    catch(error){ return error.message }
  }

  async findOne(id: number):Promise<Object | Product> {
    try{
      const findProductResponse = await this.productRepository.findOne({where : {id},relations:{addedBy:true,category:true}})
      if(findProductResponse === null ){
        return new NotFoundException(`Product with ID ${id} not found.`)
      }
      return findProductResponse;
    }
    catch(error){
      return error.message
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{
      const existingProduct = await this.productRepository.findOne({where:{id}})
      if(existingProduct === null){
        return new NotFoundException(`Product with ID ${id} not found.`)
      }
      const updateProduct = Object.assign(existingProduct,updateProductDto)
      const updateProductResponse = await this.productRepository.save(updateProduct)
      if(!updateProductResponse){
        return "Product updation failed."
      }
      return "Product updated successfully."
    }
    catch(error){
      return error.message
    }
  }
  
  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    await this.productRepository.remove(product);
  }
}
