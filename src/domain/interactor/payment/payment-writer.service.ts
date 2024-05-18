import { Payment } from '@/domain/entity/payment/payment.entity';
import { PaymentWriterServicePort } from '@/domain/interactor/port/payment/payment-writer-service.port';
import { IPaymentRepository } from '@/domain/repository/payment/payment.repository';
import { CreatePaymentDto } from '@/transport/dto/Payment/payment.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentWriterService implements PaymentWriterServicePort {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

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
