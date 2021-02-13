import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-users.dto';
import { UserDeviceDto } from './dto/user-device.dto';
import { Device } from './entity/user-device.entity';
import { User } from './entity/users.entity';
import { v4 as uuidv4 } from 'uuid';

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

    async create(user: CreateUserDto, device: UserDeviceDto) {
        let token = uuidv4();
        let createdAt = new Date();
        let expiredAt = createdAt.setDate(createdAt.getDate() + 60);
        console.log('createdAt:', createdAt)
        console.log('expiredAt:', expiredAt)
        console.log('token:', token)
        /* device = {token, createdAt, expiredAt} */

        /* return await this.userRepository.insert(user); */
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async removeById(id: string) {
        return await this.userRepository.delete(id);
    }

}
