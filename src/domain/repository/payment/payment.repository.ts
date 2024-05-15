import { Payment } from "@/domain/entity/payment/payment.entity";

export interface PaymentRepository {
    create(payment: Payment): Promise<Payment>;
}
export const PaymentRepository = Symbol('PaymentRepository')