import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

//PrismaModule

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
