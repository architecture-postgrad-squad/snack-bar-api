import { CreateProductBodyDto } from '@/transport/dto/product/create/request/create-product.dto';
import { CreateProductResponseDto } from '@/transport/dto/product/create/response/create-product-response.dto';
import { FindAllProductsResponseDto } from '@/transport/dto/product/find-all/response/find-all-response.dto';
import { ProductDto } from '@/transport/dto/product/nested/product.dto';

export interface ProductServicePort {
  create?(requestBody: CreateProductBodyDto): Promise<CreateProductResponseDto>;
  findAll?(): Promise<FindAllProductsResponseDto>;
  findById?(id: string): Promise<ProductDto>;
}

export const ProductServicePort = Symbol('ProductServicePort');
