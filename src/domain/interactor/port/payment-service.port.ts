import { Payment } from "@/domain/entity/payment/payment.entity"

export interface PaymentServicePort {
    create(payment: Payment): Promise<Payment>
}

export const PaymentServicePort = Symbol('PaymentServicePort')