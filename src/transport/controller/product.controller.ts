import { Product } from '@/core/domain/product/product.entity';
import { ProductReaderServicePort } from '@/core/interactor/port/product/product-reader-service.port';
import { ProductWriterServicePort } from '@/core/interactor/port/product/product-writer-service.port';
import { API_RESPONSE } from '@/transport/constant/api-response.constant';
import { PRODUCT } from '@/transport/constant/product.constant';
import { CreateProductBodyDto } from '@/transport/dto/product/create/request/create-product.dto';
import { CreateProductResponseDto } from '@/transport/dto/product/create/response/create-product-response.dto';
import { ProductDto } from '@/transport/dto/product/nested/product.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const { CREATED_DESC, INTERNAL_SERVER_EXCEPTION_DESC, OK_DESC, NOT_FOUND_DESC } =
  API_RESPONSE;
const { CREATE, GET_ALL, GET_BY_ID } = PRODUCT.API_PROPERTY;

@Controller('product')
@ApiTags('Product')
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
    type: () => CreateProductResponseDto,
  })
  async create(
    @Body() productBody: CreateProductBodyDto,
  ): Promise<Product> {
    return this.productWriterService.create({...productBody, category: productBody.category as CategoryEnum});
  }

  @Get('/')
  @ApiOperation({
    description: GET_ALL.DESC,
    summary: GET_ALL.SUMMARY,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => Product[],
  })
  async findAll(): Promise<Product[]> {
    return this.productReaderService.getAll();
  }

  @Get('/:id')
  @ApiOperation({
    description: GET_BY_ID.DESC,
    summary: GET_BY_ID.SUMMARY,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => Product,
  })
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productReaderService.getById(id);
  }
}
