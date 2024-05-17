import { Payment } from '@/domain/entity/payment/payment.entity';
import { PaymentServicePort } from '@/domain/interactor/port/payment-service.port';
import { PaymentRepository } from '@/domain/repository/payment/payment.repository';
import { CreatePaymentDto } from '@/transport/dto/payment.dto';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService implements PaymentServicePort {
  constructor(
    @Inject(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async create(payment: CreatePaymentDto): Promise<Payment> {
    try {
      return await this.paymentRepository.create(payment);
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Erro ao processar o pagamento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
