import { ProductReaderServicePort } from '@/domain/interactor/port/product/product-reader-service.port';
import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductReaderServicePort) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }
}
