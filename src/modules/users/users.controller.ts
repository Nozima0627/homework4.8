import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { PositivePipe } from 'src/common/validation/validation.pipe';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserRole } from '@prisma/client';
import { LoggingInterceptor } from 'src/common/interceptors/logging';
import { User } from 'src/common/decorators/user.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @UseGuards(AuthGuard)
    @Get("one")
    getOneUser(
        @Req() req: Request
        @User("firstname") firstname : string
    ){
        return this.userService.getOneUser(req['user']);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @UseInterceptors(LoggingInterceptor)
    @Get("all")
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    // @Post()
    // createUser(@Body() payload: CreateUserDto){
    //     return this.userService.createUser(payload)
    // }
}
