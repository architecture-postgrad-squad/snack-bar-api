import { Module } from '@nestjs/common';
import { ProductModule } from './config/product.module';

@Module({
  imports: [ProductModule],
})
export class AppModule { }
