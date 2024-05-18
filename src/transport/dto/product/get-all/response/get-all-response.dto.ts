import { ProductDto } from '@/transport/dto/product/nested/product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllProductsResponseDto {
  @ApiProperty()
  products: ProductDto[];
}
