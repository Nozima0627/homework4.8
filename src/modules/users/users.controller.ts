import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PositivePipe } from 'src/common/validation/validation.pipe';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @UseGuards(AuthGuard)
    @Get("one")
    getOneUser(@Req() req: Request){
        return this.userService.getOneUser(req['user']);
    }

    @UseGuards(AuthGuard)
    @Get("all")
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    // @Post()
    // createUser(@Body() payload: CreateUserDto){
    //     return this.userService.createUser(payload)
    // }
}
