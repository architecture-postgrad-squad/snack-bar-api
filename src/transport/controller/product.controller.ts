import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { API_RESPONSE } from '@/transport/constant/api-response.constant';
import { PRODUCT } from '@/transport/constant/product.constant';
import { CreateProductBodyDto } from '@/transport/dto/product/create/request/create-product.dto';
import { CreateProductResponseDto } from '@/transport/dto/product/create/response/create-product-response.dto';
import { GetAllProductsResponseDto } from '@/transport/dto/product/get-all/response/get-all-response.dto';
import { ProductDto } from '@/transport/dto/product/nested/product.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
const { CREATE, GET_ALL, GET_BY_ID } = PRODUCT.API_PROPERTY;

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductServicePort) {}

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
  @ApiOperation({
    description: GET_ALL.DESC,
    summary: GET_ALL.SUMMARY,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => GetAllProductsResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: INTERNAL_SERVER_EXCEPTION_DESC,
    type: () => InternalServerErrorException,
  })
  async findAll(): Promise<GetAllProductsResponseDto> {
    return this.productService.getAll();
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_EXCEPTION_DESC,
    type: () => NotFoundException,
  })
  async findById(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.getById(id);
  }
}
