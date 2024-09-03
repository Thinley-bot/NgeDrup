import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { UserSignUpDto } from './dto/user-signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post("signup")
    @HttpCode(200)
    userSignUp(@Body() userSignUpDto:UserSignUpDto){
        const {confirmpassword,password}=userSignUpDto;
        if(password!==confirmpassword){ return "The Password Doesn't match."}
        return this.authService.register(userSignUpDto);
    }
}
