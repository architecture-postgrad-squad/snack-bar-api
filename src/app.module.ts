import { PaymentModule } from '@/config/payment.module';
import { ProductModule } from '@/config/product.module';
import { Module } from '@nestjs/common';
import { ClientModule } from './config/client.module';
import { DatasourceModule } from './datasource/datasource.module';

@Module({
  imports: [ProductModule, PaymentModule, ClientModule, DatasourceModule],
})
export class AppModule {}
