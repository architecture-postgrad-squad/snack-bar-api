import { Payment } from '@/core/domain/payment/payment.entity';

export abstract class IPaymentRepository {
  abstract create(payment: Payment): Promise<Payment>;
  abstract findById(id: string): Promise<Payment>;
}
