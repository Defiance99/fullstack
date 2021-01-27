import { Body, Controller, HttpCode, Request, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CustomValidationPipe } from 'src/common/validation.pipe';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api/auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('signUp')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body(new CustomValidationPipe()) dataSignUp: SignUpDto) {
        return this.authService.registerUser(dataSignUp);
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    @HttpCode(HttpStatus.OK)
    /* async signIn(@Body(new CustomValidationPipe()) dataSignIn: SignInDto) { */
    async signIn(@Request() req) {
        console.log(req);
        return this.authService.login(req.user);
    }

}
