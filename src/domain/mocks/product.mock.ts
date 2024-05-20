import { Product } from '@/domain/entity/product/product.entity';
import { CategoryEnum } from '@/domain/enum/product/category.enum';

export class ProductMock {
  public static product(): Product {
    return {
      name: 'Fanta Uva',
      category: CategoryEnum.DRINK,
      price: 8,
      description: 'Garrafa de 600ml',
    };
  }

  public static productDbRegister(): Product {
    return {
      id: 'dd08cf0a-2d14-4e68-800b-f0b92818f080',
      name: 'Fanta Uva',
      category: CategoryEnum.DRINK,
      price: 8,
      description: 'Garrafa de 600ml',
    };
  }
}
