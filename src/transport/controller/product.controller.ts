import { Controller, Get } from "@nestjs/common";
import { ProductServicePort } from "src/domain/interactor/port/product-service.port";
import { ProductService } from "src/domain/interactor/product.service";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll() {
        return this.productService.findAll();
    }
}