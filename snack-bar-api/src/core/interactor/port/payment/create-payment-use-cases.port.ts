import { Client } from '@/core/domain/client/client.entity';
import { Payment } from '@/core/domain/payment/payment.entity';

export abstract class CreatePixPaymentUseCasesPort {
  abstract execute(payment: Payment, client: Client, orderId: string): Promise<Payment>;
}
