import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseInterceptors(ResponseInterceptor)
    @Post('register')
    register(@Body() payload: RegisterDto){
        return this.authService.register(payload)
    }

    @Post('login')
    login(@Body() payload: LoginDto){
        return this.authService.login(payload);
    }
}
