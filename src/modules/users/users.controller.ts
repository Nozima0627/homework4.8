import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { PositivePipe } from 'src/common/validation/validation.pipe';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get(":id")
    getOneUser(@Param("id", PositivePipe) id: number){
        return this.userService.getOneUser(id);
    }
}
