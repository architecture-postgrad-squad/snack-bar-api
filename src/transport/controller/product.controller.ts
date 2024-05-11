import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { API_RESPONSE } from '@/transport/constant/api-response.constant';
import { CreateProductBodyDto } from '@/transport/dto/product/create/request/create-product.dto';
import { CreateProductResponseDto } from '@/transport/dto/product/create/response/create-product-response.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

const { CREATED_DESC, INTERNAL_SERVER_EXCEPTION_DESC } = API_RESPONSE;

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(
    @Inject(ProductServicePort)
    private readonly productService: ProductServicePort,
  ) {}

  @Post('/')
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
  //TODO: update method call
  async create(
    @Body() productBody: CreateProductBodyDto,
  ): Promise<CreateProductResponseDto> {
    return this.productService.create(productBody);
  }

  //TODO: implement swagger documentation
  @Get()
  async findAll(): Promise<any> {
    return;
  }

  //TODO:  implement swagger documentation
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<any> {
    return;
  }
}
