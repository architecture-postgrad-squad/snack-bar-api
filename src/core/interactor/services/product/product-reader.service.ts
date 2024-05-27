import { Product } from "@/core/domain/product/product.entity";
import { CategoryEnum } from "@/core/enum/product/category.enum";
import { ProductReaderServicePort } from "@/core/interactor/port/product/product-reader-service.port";
import { IProductRepository } from "@/core/repository/product/product.repository";

export class ProductReaderService implements ProductReaderServicePort {
    constructor(private readonly productRepository: IProductRepository) {}

    getByCategory(category: CategoryEnum): Promise<Product[]> {
       return this.productRepository.findByCategory(category)
    }

    getAll(): Promise<Product[]> {
        return this.productRepository.findAll()
    }

    getById(id: string): Promise<Product> {
        try {
            return this.productRepository.findById(id);
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}
  