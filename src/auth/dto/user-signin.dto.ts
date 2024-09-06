import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDto{
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
    @MinLength(6,{message:"The password should be more than six characters."})
    password:string;
}