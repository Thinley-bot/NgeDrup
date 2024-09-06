import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description:"Firstname of the user.",
        example:"Thinley"
    })
    @IsNotEmpty({message:"FirstName cannot be empty."})
    firstname:string;

    @ApiProperty({
        description:"Middlename of the user.",
        example:"Wangchuk"
    })
    @IsOptional()
    middlename:string;
    
    @ApiProperty({
        description:"Lastname of the user.",
        example:"Namgyal"
    })
    @IsOptional()
    lastname:string;

    @ApiProperty({
        description:"Emailof the user.",
        example:"thinley@gmail.com"
    })
    @IsNotEmpty({message:"Email cannot be empty."})
    @IsEmail({},{message:"Please provide a valid email."})
    email:string;

    @ApiProperty({
        description:"Password of the user.",
        example:"Password"
    })
    @IsNotEmpty({message:"Password cannot be empty."})
    @MinLength(6)
    password:string;

    @ApiProperty({
        description:"ConfirmPassword of the user.",
        example:"confirmPassword"
    })
    @IsNotEmpty({message:"Confirm Password cannot be empty."})
    @MinLength(6)
    confirmpassword:string;
}