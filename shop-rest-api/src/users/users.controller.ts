import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {

    constructor (private userService: UsersService) {}

    /* @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() user: CreateUserDto, @Request() req) {
        let device;
        let {ip = req.ip, browser = req.headers['sec-ch-ua'], userAgent = req.headers['user-agent']} = device;
        this.userService.create(user, device);
    } */

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
