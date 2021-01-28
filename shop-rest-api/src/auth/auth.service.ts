import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
    
    constructor (
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.userService.findByLogin(login);
        if (!user) {
            throw new HttpException('Login or password is wrong', HttpStatus.UNAUTHORIZED);
        }
        const resultOfCheckingPasswords  = await bcrypt.compareSync(password, user.password);

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
            const salt = await bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
            const hash = await bcrypt.hashSync(dataUser.password, salt);
            dataUser.password = hash;

            this.userService.create(dataUser);
        }else {
            throw new HttpException('This login already exist', HttpStatus.CONFLICT)
        }
    }

    async login(dataUser: SignInDto) {
        const user = await this.userService.findByLogin(dataUser.login);
        if (user) {
            const payload = {userName: user.userName, id: user.id}
            return {
                access_token: this.jwtService.sign(payload)
            }
        }
    }

    async googleLogin(req: any) {
        console.log(req, 'google is worked');
        if (!req.user) {
            return 'No user from login'
        }
        return {
            message: 'User information from google',
            user: req.user
        }
    }
}

// Алгоритм аутентификации
//  1. Регистрация - registerUser, хэширование парооля
//  2. Первый вход - гвард на проверку логина и пароля (validateUser), пароль хэшируется и проверяется с хэшированным паролем в бд
//  2.1 Вход на защищенные маршруты, где требуется jwt токен 
//  3. При успешном первом входе устанавливается в req токен 
//  4. Последующие входы проверяется подлинность токена 
//  exp: Была проблема в неточности соблдения стратегии, решилась добавлением поля usernameField
//
// Способы конфигурации: 
// 1. импорт config из dotenv и его вызов config()
// 2. ServiceConfig в конструкторе, затем configService.get<string>('SOME_FIELD'), 
//
