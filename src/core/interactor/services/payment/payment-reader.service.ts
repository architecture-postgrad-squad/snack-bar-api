import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';

export class PaymentReaderService {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async findById(id: string) {
    try {
      return await this.paymentRepository.findById(id);
    } catch (error) {
      throw new NotFoundException({ description: 'Payment not found' });
    }
  }
}
