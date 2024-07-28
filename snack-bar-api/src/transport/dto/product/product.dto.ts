import { Product } from '@/core/domain/product/product.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { PRODUCT } from '@/transport/constant/product.constant';
import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';

const { ID, NAME, CATEGORY, PRICE, DESCRIPTION, IMAGES } = PRODUCT;

export class ProductDto {
  @ApiProperty({
    type: String,
    description: ID.DESC,
    example: ID.EXAMPLE,
  })
  id: string;

  @ApiProperty({
    type: String,
    description: NAME.DESC,
    example: NAME.EXAMPLE,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: CATEGORY.DESC,
    example: CATEGORY.EXAMPLE,
  })
  category: string;

  @ApiProperty({
    type: Number,
    description: PRICE.DESC,
    example: PRICE.EXAMPLE,
  })
  price: number;

  @ApiProperty({
    type: String,
    description: DESCRIPTION.DESC,
    example: DESCRIPTION.EXAMPLE,
  })
  description?: string;

  @ApiProperty({
    type: Array,
    description: IMAGES.DESC,
    example: IMAGES.EXAMPLE,
  })
  images?: JsonValue;

  constructor(
    id: string,
    name: string,
    category: CategoryEnum,
    price: number,
    description?: string,
    images?: JsonValue,
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
    this.images = images;
  }
}

export const toDTO = (product: Product): ProductDto => {
  return new ProductDto(
    product.id,
    product.name,
    product.category,
    product.price,
    product.description,
    product.images,
  );
};
