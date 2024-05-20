import { InternalServerErrorException } from '@/config/exceptions/custom-exceptions/internal-server-error.exception';
import { Payment } from '@/domain/entity/payment/payment.entity';
import { PaymentWriterServicePort } from '@/domain/interactor/port/payment/payment-writer-service.port';
import { IPaymentRepository } from '@/domain/repository/payment/payment.repository';
import { CreatePaymentDto } from '@/transport/dto/payment/request/payment.dto';

export class PaymentWriterService implements PaymentWriterServicePort {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async create(payment: CreatePaymentDto): Promise<Payment> {
    try {
      return await this.paymentRepository.create(payment);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        description: 'Failed to create payment',
      });
    }
  }
}
