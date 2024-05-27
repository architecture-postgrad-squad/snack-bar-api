import { Product } from "@/core/domain/product/product.entity";
import { CategoryEnum } from "@/core/enum/product/category.enum";

export abstract class IProductRepository {
    abstract create(product: Product): Promise<Product>;
    abstract findById(id: string): Promise<Product>;
    abstract findByCategory(category: CategoryEnum): Promise<Product[]>;
    abstract findAll(): Promise<Product[]>;
  }