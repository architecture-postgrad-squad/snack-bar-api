import { CategoryEnum } from '@/core/enum/product/category.enum';
import { ProductImage } from '@/core/domain/product/product-image.entity';

export class Product {
  readonly id?: string;
  readonly name: string;
  readonly category: CategoryEnum;
  readonly price: number;
  readonly description?: string;
  readonly images?: ProductImage[];
}
