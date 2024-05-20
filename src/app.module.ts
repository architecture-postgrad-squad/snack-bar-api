import { PaymentModule } from '@/config/payment.module';
import { ProductModule } from '@/config/product.module';
import { Module } from '@nestjs/common';
import { ClientModule } from './config/client.module';

@Module({
  imports: [ProductModule, PaymentModule, ClientModule],
})
export class AppModule {}
