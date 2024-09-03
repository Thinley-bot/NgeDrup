import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignUpDto{
    @IsNotEmpty({message:"FirstName cannot be empty."})
    firstname:string;

    middlename:string;

    lastname:string;

    @IsNotEmpty({message:"Email cannot be empty."})
    @IsEmail({},{message:"Please provide a valid email."})
    email:string;

    @IsNotEmpty({message:"Password cannot be empty."})
    @MinLength(6,{message:"The password should be more than six characters."})
    password:string;

    @IsNotEmpty({message:"Confirm Password cannot be empty."})
    @MinLength(6,{message:"The password should be more than six characters."})
    confirmpassword:string;
}