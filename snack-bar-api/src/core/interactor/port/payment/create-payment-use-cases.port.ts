import { Payment } from '@/core/domain/payment/payment.entity';

export abstract class CreatePaymentUseCasesPort {
  abstract execute(payment: Payment, orderId: string): Promise<Payment>;
}
