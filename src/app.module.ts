import { Module } from '@nestjs/common';
import { PrismaModule } from './core/database/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true
    }),
    PrismaModule, 
    UsersModule, 
    AuthModule]
})
export class AppModule {}
