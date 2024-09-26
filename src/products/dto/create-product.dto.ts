import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message:"Title cannot be empty."})
    @IsString()
    title:string;

    @IsNotEmpty({message:"Description cannot be empty."})
    @IsString()
    description:string;

    @IsNotEmpty({message:"Price cannot be empty."})
    @IsNumber({maxDecimalPlaces:2},{message:"Price should number and max decimal precision 2"})
    @IsPositive({message:"Price should be postive a number."})
    price:number;

    @IsNotEmpty({message:"Stock cannot be empty."})
    @IsNumber({},{message:"Stock should be number."})
    @Min(0,{message:"Stock cannot be negative"})
    stock:number;

    @IsNotEmpty({message:"Image cannot be empty."})
    @IsArray({message:"Images should be in the array format."})
    images:string[];

    @IsNotEmpty({message:"Category cannot be empty."})
    @IsNumber({},{message:"Category Id should be number."})
    category: { id: number };
}
