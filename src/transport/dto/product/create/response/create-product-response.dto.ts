import { PRODUCT } from '@/transport/constant/product.constant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductResponseDto {
  @ApiProperty({
    type: String,
    description: PRODUCT.ID.DESC,
    example: PRODUCT.ID.EXAMPLE,
  })
  id: string;
}
