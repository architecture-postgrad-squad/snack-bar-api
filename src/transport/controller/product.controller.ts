import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { API_RESPONSE } from '@/transport/constant/api-response.constant';
import { PRODUCT } from '@/transport/constant/product.constant';
import { CreateProductBodyDto } from '@/transport/dto/product/create/request/create-product.dto';
import { CreateProductResponseDto } from '@/transport/dto/product/create/response/create-product-response.dto';
import { FindAllProductsResponseDto } from '@/transport/dto/product/find-all/response/find-all-response.dto';
import { ProductDto } from '@/transport/dto/product/nested/product.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const {
  CREATED_DESC,
  INTERNAL_SERVER_EXCEPTION_DESC,
  OK_DESC,
  NOT_FOUND_EXCEPTION_DESC,
} = API_RESPONSE;

const { API_PROPERTY } = PRODUCT;

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(
    @Inject(ProductServicePort)
    private readonly productService: ProductServicePort,
  ) {}

  @Post('/')
  @ApiOperation({ description: API_PROPERTY.CREATE, summary: '' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_DESC,
    type: () => CreateProductResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: INTERNAL_SERVER_EXCEPTION_DESC,
    type: () => InternalServerErrorException,
  })
  async create(
    @Body() productBody: CreateProductBodyDto,
  ): Promise<CreateProductResponseDto> {
    return this.productService.create(productBody);
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => FindAllProductsResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: INTERNAL_SERVER_EXCEPTION_DESC,
    type: () => InternalServerErrorException,
  })
  async findAll(): Promise<FindAllProductsResponseDto> {
    return this.productService.findAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => ProductDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_EXCEPTION_DESC,
    type: () => NotFoundException,
  })
  async findById(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.findById(id);
  }
}
