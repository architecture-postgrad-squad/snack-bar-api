import { Payment } from '@/core/domain/payment/payment.entity';

export abstract class PaymentWriterServicePort {
  abstract create(payment: Payment, orderId: string): Promise<Payment>;
}
