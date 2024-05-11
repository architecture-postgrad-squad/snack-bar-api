import { CategoryEnum } from '@/domain/enum/product/category.enum';

export class Product {
  readonly id?: string;
  readonly name: string;
  readonly category: CategoryEnum;
  readonly price: number;
  readonly description?: string;
  readonly images?: string[];
}
