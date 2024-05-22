import { Payment } from '@/core/domain/payment/payment.entity';
import { CreatePaymentDto } from '@/transport/dto/payment/request/payment.dto';

export abstract class IPaymentRepository {
  abstract create(payment: CreatePaymentDto): Promise<Payment>;
}
