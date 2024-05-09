import { Controller, Get, Inject } from "@nestjs/common";
import { ProductServicePort } from "src/domain/interactor/port/product-service.port";

@Controller('product')
export class ProductController {
    constructor(
        @Inject(ProductServicePort)
        private readonly productService: ProductServicePort
    ) {}

    @Get()
    async findAll() {
        return this.productService.findAll();
    }
}