import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CheckoutModule,
    ConfigModule.forRoot({
      isGlobal: true, // Rendre le module de configuration global
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
