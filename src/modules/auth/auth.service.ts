import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService,
        private jwtService: JwtService
    ){}

    async register(payload: RegisterDto){
        const existUser = await this.prisma.user.findUnique({
            where:{ email: payload.email}
        })
        if(existUser) throw new ConflictException("User with this email already signed up")

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
            token: this.jwtService.sign({id:newUser.id, email: newUser.email, role: newUser.role})
        }
    }

    async login(payload : LoginDto){

        const existUser = await this.prisma.user.findUnique({
            where:{email: payload.email}
        })

        if(!existUser) throw new NotFoundException("Email or password is wrong");
        if(!await bcrypt.compare(payload.password, existUser.password)) {
            throw new BadRequestException("Email or password is wrong");
        }

        return {
            success: true,
            token: this.jwtService.sign({id:existUser.id, email: existUser.email, role: existUser.role})
        }
    }
}
