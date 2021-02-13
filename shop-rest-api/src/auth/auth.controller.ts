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
    async signUp(@Body(new CustomValidationPipe()) dataSignUp: SignUpDto, @Request() req) {
        console.log(req)
        let device;
        let {ip = req.headers['ip'], browser = req.headers['sec-ch-ua'], userAgent = req.headers['user-agent']} = device;
        console.log('Device: ',device);
        return this.authService.registerUser(dataSignUp, device);
    }
    
    @Post('signIn')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    googleLogin() {

    }  

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    googleLoginCallback(@Request() req) {
        return this.authService.googleLogin(req.user);
    }

}
