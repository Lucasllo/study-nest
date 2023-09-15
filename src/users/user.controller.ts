/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../users/user';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserUpdatePartialDto } from './dto/user.update.partial.dto';

@Controller('/users')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Get()
     async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Post()
    async createUser(@Body() body: UserDto): Promise<User>{

        return this.userService.createUser(body);
    }

    @Get(':id')
     async getUser(@Param() param){
        return {param: param};
    }

    @Patch(':id')
     async updatePartialUser(@Body() {nome,email,senha}: UserUpdatePartialDto, @Param() param){
        return {param: param, nome,email,senha};
    }

    @Put(':id')
     async updateUser(@Body() body: UserUpdateDto, @Param() param){
        return {param: param, body: body};
    }

    @Delete(':id')
     async deleteUser(@Body() body, @Param() param){
        return {param: param, body: body};
    }
}