import { Inject, Injectable } from "@nestjs/common";
import { Product } from "../entity/product/product.entity";
import { ProductServicePort } from "./port/product-service.port";
import { ProductRepository } from "../repository/product/product.repository";

@Injectable()
export class ProductService implements ProductServicePort {
    constructor(
        @Inject(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productRepository.findAll()
    }
}