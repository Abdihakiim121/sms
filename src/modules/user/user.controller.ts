import {Body, Controller, Get, Patch, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./Dto/user.dto";
import {Batch} from "typeorm";
import {UserEntity} from "./user.entity";

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {
    }
    @Get('/')
    getAllUsers(){
        return this.userService.getAllUser();
    }
    @Post("/")
    createUser(@Body() userDto:UserDto){
        return this.userService.create(userDto);
    }

    @Patch("/")
    async updateUser(@Body() userDto:UserDto):Promise<UserEntity>{
        const user = await this.userService.update(userDto);
       console.log(user);
        return null;
    }
}
