import { Payment } from '@/core/domain/payment/payment.entity';

export abstract class PaymentReaderServicePort {
  abstract findById(id: string): Promise<Payment>;
}
