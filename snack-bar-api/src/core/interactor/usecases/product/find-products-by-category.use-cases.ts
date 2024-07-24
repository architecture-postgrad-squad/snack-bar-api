import { Product } from '@/core/domain/product/product.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { BadRequestException } from '@/core/exceptions/custom-exceptions/bad-request.exception';
import { FindProductsByCategoryUseCasesPort } from '@/core/interactor/port/product/find-products-by-category-use-cases.port';
import { IProductRepository } from '@/core/repository/product/product.repository';

export class FindProductsByCategoryUseCases implements FindProductsByCategoryUseCasesPort {
  constructor(private readonly productRepository: IProductRepository) { }

  execute(category: string): Promise<Product[]> {
    if (!CategoryEnum[category]) {
      throw new BadRequestException({ description: 'Category not found' });
    }
    return this.productRepository.findByCategory(CategoryEnum[category]);
  }

}
