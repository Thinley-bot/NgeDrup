import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';

import { UserSignUpDto } from './dto/user-signup.dto';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/user-signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post("signup")
    @HttpCode(200)
    userSignUp(@Body() userSignUpDto:UserSignUpDto){
        const {confirmpassword,password}=userSignUpDto;
        if(password!==confirmpassword){ return "The Password doesn't match."}
        return this.authService.register(userSignUpDto);
    }

    @UseGuards(LocalGuard)
    @Post("signin")
    @HttpCode(200)
    userSignIn(@Body() userSignInDto:UserSignInDto){
        return this.authService.login(userSignInDto)
    }
}
