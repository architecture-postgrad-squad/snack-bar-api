import { Product } from '@/domain/entity/product/product.entity';
import { CreateProductBodyDto } from '@/transport/dto/product/create/request/create-product.dto';
import { CreateProductResponseDto } from '@/transport/dto/product/create/response/create-product-response.dto';

export interface ProductServicePort {
  create?(requestBody: CreateProductBodyDto): Promise<CreateProductResponseDto>;
  findAll?(): Promise<Product[]>;
}

export const ProductServicePort = Symbol('ProductServicePort');
