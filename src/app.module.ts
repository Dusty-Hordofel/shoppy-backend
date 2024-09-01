import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
// import { PrismaModule } from './prisma/prisma.module';
import { PrismaModule } from './prisma/prisma.module';

//PrismaModule

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
