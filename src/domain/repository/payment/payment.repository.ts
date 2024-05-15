import { Payment } from '@/domain/entity/payment/payment.entity';
import { CreatePaymentDto } from '@/transport/dto/payment.dto';

export interface PaymentRepository {
  create(payment: CreatePaymentDto): Promise<Payment>;
}
export const PaymentRepository = Symbol('PaymentRepository');
