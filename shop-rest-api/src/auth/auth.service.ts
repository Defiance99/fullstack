import { Injectable } from '@nestjs/common';
import { bcrypt } from 'bcrypt';
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
        const user = await this.userService.findOne(dataSignIn.login);
        const resultOfCheckingPasswords  = await bcrypt.compareSync(dataSignIn.password, user.password);

        if (user && resultOfCheckingPasswords) {
            return user;
        }else {
            return null;
        }
    }

    async registerUser(dataUser: SignUpDto) {
        const user = await this.userService.findOne(dataUser.login);

        if (user) {
            bcrypt.hash(user.password, this.saltRounds, function(err, hash) {
                user.password = hash;
                this.userService.create(user);
            });
        }else {
            return null;
        }
        
    }


}
