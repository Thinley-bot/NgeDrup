import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Product } from "src/products/entities/product.entity"

export class CreateReviewDto {
    @IsNotEmpty({message:"The ratings cannot be empty."})
    @IsNumber({},{message:"The ratings should be number"})
    ratings:number

    @IsNotEmpty({message:"The comment cannot be empty."})
    @IsString({message:"The comment should be a string."})
    comment:string

    @IsNotEmpty({message:"The productID cannot be empty."})
    @IsNumber({},{message:"The productID should be a number."})
    product:number
}
