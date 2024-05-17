import { PaymentModule } from '@/config/payment.module';
import { ProductModule } from '@/config/product.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProductModule, PaymentModule],
})
export class AppModule {}
