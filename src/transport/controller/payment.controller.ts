import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { InternalServerErrorException } from '@/config/exceptions/custom-exceptions/internal-server-error.exception';
import { Payment } from '@/core/domain/payment/payment.entity';
import { PaymentWriterServicePort } from '@/core/interactor/port/payment/payment-writer-service.port';
import { API_RESPONSE } from '@/transport/constant/api-response.constant';
import { PAYMENT } from '@/transport/constant/payment.constant';
import { CreatePaymentDto, toDomain } from '@/transport/dto/payment/request/payment.dto';

const { CREATE } = PAYMENT.API_PROPERTY;
const { CREATED_DESC, INTERNAL_SERVER_EXCEPTION_DESC } = API_RESPONSE;

@Controller('payments')
@ApiTags('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentWriterServicePort) {}

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
    return (
      await this.paymentService.create(
        toDomain(createPaymentDto),
        createPaymentDto.orderId,
      )
    ).id;
  }
}
