import { Body, Controller, HttpCode, Request, HttpStatus, Post, UseGuards, Get } from '@nestjs/common';
import { CustomValidationPipe } from 'src/common/validation.pipe';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

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
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google')
    async googleAuth(@Request() req) {}  

    @UseGuards(GoogleAuthGuard)
    @Get('redirect')
    async googleAuthRedirect(@Request() req) {
        this.authService.googleLogin(req);
    }

}
