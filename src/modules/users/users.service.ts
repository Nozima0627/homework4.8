import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async getAllUsers(){
        const users = await this.prisma.user.findMany()

        return {
            succcess: true,
            data: users
        }
    }

    async createUser(payload: CreateUserDto){
        this.prisma.user.create({
            data: payload
        })

        return {
            success: true,
            message: "User created"
        }
    }
}
