import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('api/auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('signUp')
    async signUp(@Body() dataSignUp: SignUpDto) {
        this.authService.registerUser(dataSignUp);
    }

    @Post('signIn')
    async signIn(@Body() dataSignIn: SignInDto) {
        this.authService.validateUser(dataSignIn);
    }

}
