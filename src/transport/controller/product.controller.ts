import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CategoryEnum } from '@/core/enum/product/category.enum';
import { ProductReaderServicePort } from '@/core/interactor/port/product/product-reader-service.port';
import { ProductWriterServicePort } from '@/core/interactor/port/product/product-writer-service.port';
import { API_RESPONSE } from '@/transport/constant/api-response.constant';
import { PRODUCT } from '@/transport/constant/product.constant';
import { CreateProductRequestDto, toDomain } from '@/transport/dto/product/create-product.dto';
import { ProductDto, toDTO } from '@/transport/dto/product/product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const { CREATED_DESC, OK_DESC } =
  API_RESPONSE;
const { CREATE, GET_ALL, GET_BY_ID, GET_BY_CATEGORY } = PRODUCT.API_PROPERTY;

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(
    private readonly productReaderService: ProductReaderServicePort,
    private readonly productWriterService: ProductWriterServicePort,
  ) {}

  @Post('/')
  @ApiOperation({
    description: CREATE.DESC,
    summary: CREATE.SUMMARY,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_DESC,
    type: () => ProductDto,
  })
  async create(
    @Body() productBody: CreateProductRequestDto,
  ): Promise<ProductDto> {
    return toDTO(await this.productWriterService.create(toDomain(productBody)));
  }

  @Get('/')
  @ApiOperation({
    description: GET_ALL.DESC,
    summary: GET_ALL.SUMMARY,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => ProductDto,
  })
  async findAll(): Promise<ProductDto[]> {
    return (await this.productReaderService.getAll()).map((product) => (toDTO(product)));
  }

  @Get('/:id')
  @ApiOperation({
    description: GET_BY_ID.DESC,
    summary: GET_BY_ID.SUMMARY,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => ProductDto,
  })
  async findById(@Param('id') id: string): Promise<ProductDto> {
    return toDTO(await this.productReaderService.getById(id));
  }

  @Get('category/:categoryName')
  @ApiOperation({
    description: GET_BY_CATEGORY.DESC,
    summary: GET_BY_CATEGORY.SUMMARY,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => ProductDto,
  })
  async findByCategory(@Param('categoryName') categoryName: string): Promise<ProductDto[]> {
    return (await this.productReaderService.getByCategory(categoryName as CategoryEnum)).map((product) => (toDTO(product)));
  }
}
