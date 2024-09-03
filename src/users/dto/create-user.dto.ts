import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:"FirstName cannot be empty."})
    firstname:string;

    @IsOptional()
    middlename:string;
    
    @IsOptional()
    lastname:string;

    @IsNotEmpty({message:"Email cannot be empty."})
    @IsEmail({},{message:"Please provide a valid email."})
    email:string;

    @IsNotEmpty({message:"Password cannot be empty."})
    @MinLength(6)
    password:string;

    @IsNotEmpty({message:"Confirm Password cannot be empty."})
    @MinLength(6)
    confirmpassword:string;
}