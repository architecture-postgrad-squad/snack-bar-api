import { Payment } from '@/domain/entity/payment/payment.entity';
import { PaymentWriterServicePort } from '@/domain/interactor/port/payment/payment-writer-service.port';
import { CreatePaymentDto } from '@/transport/dto/Payment/payment.dto';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentWriterServicePort) {}

  @Post()
  @ApiOperation({ summary: 'Create a payment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The payment has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiBody({
    description: 'The payment data',
    type: Payment,
    examples: {
      simplePayment: {
        value: {
          value: 100.0,
          method: 'Credit Card',
        },
      },
    },
  })
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }
}
