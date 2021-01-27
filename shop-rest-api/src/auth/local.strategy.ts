import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(dataSignIn: SignInDto): Promise<User> {
      console.log('i am work')
        const user = await this.authService.validateUser(dataSignIn);
        if (!user) {
          console.log('GUARD IS WORKING')
          throw new UnauthorizedException();
        }
        return user;
      }

}