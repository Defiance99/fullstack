import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {

    private saltRounds = 10;
    
    constructor (
        private userService: UsersService
    ) {}

    async validateUser(dataSignIn: SignInDto) {
        const user = await this.userService.findByLogin(dataSignIn.login);
        const resultOfCheckingPasswords  = await bcrypt.compareSync(dataSignIn.password, user.password);

        if (user && resultOfCheckingPasswords) {
            return user;
        }else {
            return null;
        }
    }

    async registerUser(dataUser: SignUpDto) {
        const user = await this.userService.findByLogin(dataUser.login);

        if (!user) {
            const salt = await bcrypt.genSaltSync(this.saltRounds);
            const hash = await bcrypt.hashSync(dataUser.password, salt);
            dataUser.password = hash;

            this.userService.create(dataUser);
        }else {
            throw new HttpException('This login already exist', HttpStatus.CONFLICT)
        }
    }


}
