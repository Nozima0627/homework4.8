import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService,
        private jwtService: JwtService
    ){}

    async register(payload: RegisterDto){
        const hash_pass = await bcrypt.hash(payload.password, 10);
        const newUser = await this.prisma.user.create({
            data:{
                name: payload.name,
                email: payload.email,
                age: payload.age,
                password: hash_pass
            }
        })

        return {
            success: true,
            token: this.jwtService.sign({id:newUser.id, email: newUser.email})
        }
    }
}
