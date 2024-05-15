import {Inject, Injectable} from "@nestjs/common";
import {Payment} from "../entity/payment/payment.entity";
import {PaymentServicePort} from "./port/payment-service.port";
import {PaymentRepository} from "../repository/payment/payment.repository";

@Injectable()
export class PaymentService implements PaymentServicePort {
    constructor(
        @Inject(PaymentRepository)
        private readonly paymentRepository: PaymentRepository
    ) {}

    async create(payment: Payment): Promise<Payment> {
        return this.paymentRepository.create(payment)
    }
}
