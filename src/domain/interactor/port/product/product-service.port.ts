import { CreateProductBodyDto } from '@/transport/dto/product/create/request/create-product.dto';
import { CreateProductResponseDto } from '@/transport/dto/product/create/response/create-product-response.dto';
import { GetAllProductsResponseDto } from '@/transport/dto/product/get-all/response/get-all-response.dto';
import { ProductDto } from '@/transport/dto/product/nested/product.dto';

export abstract class ProductServicePort {
  abstract create?(requestBody: CreateProductBodyDto): Promise<CreateProductResponseDto>;
  abstract getAll?(): Promise<GetAllProductsResponseDto>;
  abstract getById?(id: string): Promise<ProductDto>;
}
