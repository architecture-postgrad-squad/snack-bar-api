import { PRODUCT } from '@/transport/constant/product.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

const { NAME, CATEGORY, PRICE, DESCRIPTION, IMAGES } = PRODUCT;

export class CreateProductBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: NAME.DESC,
    example: NAME.EXAMPLE,
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: CATEGORY.DESC,
    example: CATEGORY.EXAMPLE,
    required: true,
  })
  category: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: PRICE.DESC,
    example: PRICE.EXAMPLE,
    required: true,
  })
  price: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: DESCRIPTION.DESC,
    example: DESCRIPTION.EXAMPLE,
    required: false,
  })
  description?: string;

  @ApiProperty({
    type: Array,
    description: IMAGES.DESC,
    example: IMAGES.EXAMPLE,
    required: false,
  })
  images?: string[];
}
