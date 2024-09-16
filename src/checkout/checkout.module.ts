import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import Stripe from 'stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [CheckoutController],
  providers: [
    CheckoutService,
    {
      provide: Stripe,
      useFactory: () => {
        // const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        // const stripeSecretKey = configService.get<string>('STRIPE_SECRET_KEY');
        // if (!stripeSecretKey) {
        //   throw new Error('STRIPE_SECRET_KEY is not defined');
        // }
        return new Stripe(
          'sk_test_51NZaglAJF88lxObTvUS00OhlIuefFG16bfLlymCGOiEhA9A7kAjp9Z8d18PM1yZtYJUHfsWJn4lL4TsPpqPsO5BS00BE5U4Fy4',
          {
            apiVersion: '2024-06-20', // Spécifiez la version de l'API Stripe si nécessaire
          },
        );
      },
    },
  ],
})
export class CheckoutModule {}
// new Stripe(configService.getOrThrow('STRIPE_SECRET_KEY')),
// new Stripe(
//   'sk_test_51NZaglAJF88lxObTvUS00OhlIuefFG16bfLlymCGOiEhA9A7kAjp9Z8d18PM1yZtYJUHfsWJn4lL4TsPpqPsO5BS00BE5U4Fy4',
// ),
