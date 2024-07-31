import { Client } from '@/core/domain/client/client.entity';
import { Payment } from '@/core/domain/payment/payment.entity';

export abstract class MercadoPagoServicePort {
  abstract createPayment(payment: Payment, client: Client): Promise<Payment>;
  abstract getPaymentById(identifier: string): Promise<Payment>;
}
