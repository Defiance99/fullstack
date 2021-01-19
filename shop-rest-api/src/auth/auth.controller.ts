import { Body, Controller, Post } from '@nestjs/common';
import { CustomValidationPipe } from 'src/common/validation.pipe';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('api/auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('signUp')
    async signUp(@Body(new CustomValidationPipe()) dataSignUp: SignUpDto) {
        return this.authService.registerUser(dataSignUp);
    }

    @Post('signIn')
    async signIn(@Body(new CustomValidationPipe()) dataSignIn: SignInDto) {
        return this.authService.validateUser(dataSignIn);
    }

}
