import { Product } from "@/core/domain/product/product.entity";
import { CategoryEnum as string } from "@/core/enum/product/category.enum";

export abstract class ProductReaderServicePort {
    abstract getAll(): Promise<Product[]>;
    abstract getById(id: string): Promise<Product>;
    abstract getByCategory(category: string): Promise<Product[]>;
  }