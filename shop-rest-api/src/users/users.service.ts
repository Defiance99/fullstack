import { Injectable } from '@nestjs/common';
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

    async findOne(login: string): Promise<User | undefined> {
        return await this.userRepository.findOne({'login': login});
    }

    async create(user: CreateUserDto) {
        return await this.userRepository.insert(user);
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

}
