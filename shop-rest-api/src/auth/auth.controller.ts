import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CustomValidationPipe } from 'src/common/validation.pipe';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('api/auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('signUp')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body(new CustomValidationPipe()) dataSignUp: SignUpDto) {
        return this.authService.registerUser(dataSignUp);
    }

    @Post('signIn')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body(new CustomValidationPipe()) dataSignIn: SignInDto) {
        return this.authService.validateUser(dataSignIn);
    }

}
