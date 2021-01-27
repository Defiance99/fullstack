import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {

    private saltRounds = 10;
    
    constructor (
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(dataSignIn: SignInDto) {
        const user = await this.userService.findByLogin(dataSignIn.login);
        if (!user) {
            throw new HttpException('Login or password is wrong', HttpStatus.UNAUTHORIZED);
        }
        const resultOfCheckingPasswords  = await bcrypt.compareSync(dataSignIn.password, user.password);

        if (user && resultOfCheckingPasswords) {
            const {password, ...result} = user;
            return result;
        }else {
            throw new HttpException('Login or password is wrong', HttpStatus.UNAUTHORIZED);
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

<<<<<<< HEAD
    async login(dataUser: SignInDto) {
        const payload = {
            username: dataUser.login,
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

=======
    async login(user: SignInDto) {
        /* const payload = { userName: user.login, sub: user}; */
        console.log(user);
        /* return {
            access_token: this.jwtService.sign(payload);
        } */
    }
>>>>>>> backend-auth
}

// Алгоритм аутентификации
//  1. Регистрация - registerUser, хэширование парооля
//  2. Первый вход - гвард на проверку логина и пароля (validateUser), пароль хэшируется и проверяется с хэшированным паролем в бд
//  2.1 Вход на защищенные маршруты, где требуется jwt токен 
//  3. При успешном первом входе устанавливается в req токен 
//  4. Последующие входы проверяется подлинность токена 
//