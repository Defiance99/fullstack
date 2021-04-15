import { Body, Controller, HttpCode, Request, HttpStatus, Post, UseGuards, Get } from '@nestjs/common';
import { ValidationPipe } from 'src/common/validation.pipe';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { TokensDto } from './dto/tokens.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('signUp')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body(new ValidationPipe()) dataSignUp: SignUpDto, @Request() req) {
        let ip = req.connection.remoteAddress;
        let browser = req.headers['sec-ch-ua'];
        let userAgent = req.headers['user-agent'];
        let device = {ip, browser, userAgent};  
        
        return this.authService.registerUser(dataSignUp, device);
    }
    
    @Post('signIn')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    async login(@Request() req) {
        return this.authService.login(req);
    }

    @Post('updateTokens')
    @HttpCode(HttpStatus.OK)
    async updateTokens(@Body() tokensDto: TokensDto, @Request() req) {
        return this.authService.updateTokens(tokensDto, req);
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
