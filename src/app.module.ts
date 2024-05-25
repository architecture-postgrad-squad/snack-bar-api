import { ProductModule } from '@/config/modules/product.module';
import { PaymentModule } from '@/config/modules/payment.module';
import { Module } from '@nestjs/common';
import { ClientModule } from '@/config/modules/client.module';

@Module({
  imports: [ProductModule, PaymentModule, ClientModule],
})
export class AppModule {}
