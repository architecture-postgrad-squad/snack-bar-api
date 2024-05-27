import { CategoryEnum } from '@/core/enum/product/category.enum';

export class Product {
  readonly id?: string;
  readonly name: string;
  readonly category: CategoryEnum;
  readonly price: number;
  readonly description?: string;
  readonly images?: string[];

  constructor(name: string, category: CategoryEnum, price: number, description: string, images?: string[], id?: string) {
    this.id = id
    this.category = category
    this.name = name
    this.price = price
    this.description = description
    this.images = images
  }
}
