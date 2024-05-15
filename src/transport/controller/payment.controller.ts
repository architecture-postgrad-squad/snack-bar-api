import { Controller, Post, Inject, Body } from "@nestjs/common";
import { PaymentServicePort } from "@/domain/interactor/port/payment-service.port";
import { Payment } from "@/domain/entity/payment/payment.entity";

@Controller('payments')
export class PaymentController {
    constructor(
        @Inject(PaymentServicePort)
        private readonly paymentService: PaymentServicePort
    ) {}

    @Post()
    async create(@Body() payment: Payment): Promise<Payment> {
        return this.paymentService.create(payment);
    }
}