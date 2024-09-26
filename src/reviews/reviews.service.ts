import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateReviewDto } from './dto/create-review.dto';
import { ProductsService } from 'src/products/products.service';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private readonly reviewRepository:Repository<Review>, private readonly productService:ProductsService){}

  async create(createReviewDto: CreateReviewDto, currentUser:User) {
    const product = await this.productService.findOne(+createReviewDto.product)
    if(!product){
      return new NotFoundException(`Product with this id ${createReviewDto.product} cannot be found.`)
    }
    const review = await this.reviewRepository.create(createReviewDto)
    review.products = product;
    review.addedBy = currentUser;
    const createReviewResponse = await this.reviewRepository.save(review)
    if(!createReviewResponse){
      return "Review creation failed"
    }
    return 'Review created successfully.';
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
