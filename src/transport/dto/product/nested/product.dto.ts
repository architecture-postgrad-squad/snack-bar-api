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
}
