import { Payment } from '@/core/domain/payment/payment.entity';

export abstract class MercadoPagoServicePort {
  abstract getPaymentById(identifier: string): Promise<Payment>;
}
