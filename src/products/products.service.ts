import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService { 
  constructor(@InjectRepository(Product) private readonly productRepository:Repository<Product>){}
  async create(createProductDto: CreateProductDto):Promise<String> {
    try{
      const createProductResponse = await  this.productRepository.save(createProductDto)
      if(!createProductDto){ return "Product creation failed." }
      return "Product created successfully."
    }
    catch(error){ 
      return error.message
    }
  }

  async findAll():Promise<Product[]> {
    try{ return await this.productRepository.find() }
    catch(error){ return error.message }
  }

  async findOne(id: number):Promise<Object | Product> {
    try{
      const findProductResponse = await this.productRepository.findOne({where : {id}})
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
