import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(dataSignIn: SignInDto): Promise<any> {
        const user = await this.authService.validateUser(dataSignIn);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }

}