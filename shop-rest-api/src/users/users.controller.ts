import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {

    constructor (private userService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() user: CreateUserDto) {
        this.userService.create(user);
    }

    /* @Post()
    async findOne(@Body() login: string) {
        return this.userService.findOne(login);
    } */

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return this.userService.getAll();
    }

    @Delete(':id')
    async removeById(@Param('id') id: string) {
        return this.userService.removeById(id);
    }

}
