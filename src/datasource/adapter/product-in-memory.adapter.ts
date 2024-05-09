import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/entity/product/product.entity";
import { ProductRepository } from "src/domain/repository/product/product.repository";

@Injectable()
export class ProductInMemoryAdapter implements ProductRepository {
    findAll(): Product[] {
        return []
    }

}