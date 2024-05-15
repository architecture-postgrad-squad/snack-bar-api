import { Payment } from '@/domain/entity/payment/payment.entity';
import { PaymentServicePort } from '@/domain/interactor/port/payment-service.port';
import { CreatePaymentDto } from '@/transport/dto/payment.dto';
import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('payments')
export class PaymentController {
  constructor(
    @Inject(PaymentServicePort)
    private readonly paymentService: PaymentServicePort,
  ) {}

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
