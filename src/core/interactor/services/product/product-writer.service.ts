import { Product } from "@/core/domain/product/product.entity";
import { IProductRepository } from "@/core/repository/product/product.repository";
import { ProductWriterServicePort } from "@/core/interactor/port/product/product-writer-service.port";

export class ProductWriterService implements ProductWriterServicePort {
    constructor(private readonly productRepository: IProductRepository) {}

    create(product: Product): Promise<Product> {
        try{
            return this.productRepository.create(product)
        } catch (e) {
            console.log(e)
            throw e
        }
    }

}
  