import { Module } from '@nestjs/common';
import { ProductModule } from './config/product.module';
import { PaymentModule } from './config/payment.module';

@Module({
  imports: [ProductModule, PaymentModule],
})
export class AppModule { }
