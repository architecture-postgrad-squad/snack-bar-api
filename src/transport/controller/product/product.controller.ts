import { ProductServicePort } from '@/domain/interactor/port/product/product-service.port';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ProductServicePort)
    private readonly productService: ProductServicePort,
  ) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }
}
