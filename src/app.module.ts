import { ProductModule } from '@/config/product.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProductModule],
})
export class AppModule { }
