import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async getOneUser({id, email} : {id: number, email: string}){
        const user = await this.prisma.user.findUnique({
            where: {id},
            select: {
                id: true,
                name: true,
                email: true,
                age: true
            }
        })

        return {
            success: true,
            data: user
        }
    }

    async getAllUsers(){
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                age: true
            }
        })

        return {
            succcess: true,
            data: users
        }
    }

    // async createUser(payload: CreateUserDto){
    //     this.prisma.user.create({
    //         data: payload
    //     })

    //     return {
    //         success: true,
    //         message: "User created"
    //     }
    // }
}
