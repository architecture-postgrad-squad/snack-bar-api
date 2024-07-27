import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Payment } from '@/core/domain/payment/payment.entity';
import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { PaymentReaderServicePort } from '@/core/interactor/port/payment/payment-reader-service.port';
import { PaymentWriterServicePort } from '@/core/interactor/port/payment/payment-writer-service.port';
import { UpdatePaymentServicePort } from '@/core/interactor/port/payment/update-payment-service.port';
import { API_RESPONSE } from '@/transport/constant/api-response.constant';
import { PAYMENT } from '@/transport/constant/payment.constant';
import { CreatePaymentDto, toDomain } from '@/transport/dto/payment/request/payment.dto';
import {
  GetPaymentStatusResponseDto,
  toDTO,
} from '@/transport/dto/payment/response/get-payment-status.dto';

const { CREATE, GET_BY_ID, UPDATE_BY_ID } = PAYMENT.API_PROPERTY;
const { CREATED_DESC, OK_DESC, INTERNAL_SERVER_EXCEPTION_DESC, NOT_FOUND_DESC } =
  API_RESPONSE;

@Controller('payments')
@ApiTags('payments')
export class PaymentController {
  constructor(
    private readonly paymentWriterService: PaymentWriterServicePort,
    private readonly paymentReaderService: PaymentReaderServicePort,
    private readonly updatePaymentUseCaseService: UpdatePaymentServicePort,
  ) {}

  @Post()
  @ApiOperation({ summary: CREATE.SUMMARY, description: CREATE.DESC })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_DESC,
    type: () => Payment,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: INTERNAL_SERVER_EXCEPTION_DESC,
    type: () => InternalServerErrorException,
  })
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentWriterService.create(
      toDomain(createPaymentDto),
      createPaymentDto.orderId,
    );

    return { id: payment.id };
  }

  @Get(':id')
  @ApiOperation({ summary: GET_BY_ID.SUMMARY, description: GET_BY_ID.DESC })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => GetPaymentStatusResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_DESC,
    type: () => NotFoundException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: INTERNAL_SERVER_EXCEPTION_DESC,
    type: () => InternalServerErrorException,
  })
  async getStatusById(@Param('id') id: string): Promise<any> {
    return toDTO(await this.paymentReaderService.findById(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: UPDATE_BY_ID.SUMMARY, description: UPDATE_BY_ID.DESC })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_DESC,
    type: () => NotFoundException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: INTERNAL_SERVER_EXCEPTION_DESC,
    type: () => InternalServerErrorException,
  })
  async updateById(@Param('id') id: string): Promise<any> {
    return await this.updatePaymentUseCaseService.execute(id);
  }
}
