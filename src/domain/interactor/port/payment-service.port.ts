import { Payment } from '@/domain/entity/payment/payment.entity';
import { CreatePaymentDto } from '@/transport/dto/payment.dto';
export interface PaymentServicePort {
  create(payment: CreatePaymentDto): Promise<Payment>;
}

export const PaymentServicePort = Symbol('PaymentServicePort');
