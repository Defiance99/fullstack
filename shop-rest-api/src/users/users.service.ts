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
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Device) private deviceRepository: Repository<Device>
    ) {}

    async findByLogin(login: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({login});
        if (user) {
            return user;
        }
    }

    async create(user: CreateUserDto, device: UserDeviceDto): Promise<User> {
        let userTable = {};
        userTable = user;
        userTable['devices'] = [device];

        return await this.userRepository.save(userTable);

    }

    async updateRefreshToken(userId: number, device: string, ip: string) {
        let refreshToken = await this.createRefreshToken();

        await this.deviceRepository
            .createQueryBuilder('device')
            .leftJoin('device.user', 'user')
            .where('user.id = :id', {
                'id': userId,
                'userAgent': device,
                'ip': ip
            })
            .update(Device)
            .set({
                'token': refreshToken.token,
                'expiredAt': refreshToken.expiredAt,
                'createdAt': refreshToken.createdAt
            })
            .execute()

        return refreshToken.token;
            
    }

    async createRefreshToken() {
        let token = uuidv4();
        let today = new Date();
        let createdAt = +(new Date());
        let expiredAt = today.setDate(today.getDate() + 60);

        return {token, createdAt, expiredAt};
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async removeById(id: string) {
        return await this.userRepository.delete(id);
    }

    async checkRefreshToken(userId: number, refreshToken: string, exp: number) {
        return await this.deviceRepository
            .createQueryBuilder('device')
            .leftJoin('device.user', 'user')
            .where('user.id = :id', {
                'id': userId,
                'token': refreshToken,
                'expiredAt': exp
            })
            .select('device.id')
            .getOne();
    }

}
