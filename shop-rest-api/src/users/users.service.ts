import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {

    readonly saltRounds: number = 10;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findByLogin(login: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({login});
        if (user) {
            return user;
        }/* else {
            throw new HttpException('User with the login does not exist', HttpStatus.NOT_FOUND);
        } */
    }

    async create(user: CreateUserDto) {
        return await this.userRepository.insert(user);
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async removeById(id: string) {
        return await this.userRepository.delete(id);
    }

}
