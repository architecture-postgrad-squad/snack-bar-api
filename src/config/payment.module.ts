import { Module } from "@nestjs/common";
import { PaymentServicePort } from "@/domain/interactor/port/payment-service.port";
import { PaymentService } from "@/domain/interactor/payment.service";
import { PaymentRepository } from "@/domain/repository/payment/payment.repository";
import { PrismaPaymentRepository } from "@/infrastructure/persistence/prisma/prisma-payment.repository";
import { PaymentController } from "@/transport/controller/payment.controller";
import { PrismaService } from "prisma/prisma.service";

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [
        PrismaService,
        {
            provide: PaymentServicePort,
            useClass: PaymentService,
        },
        {
            provide: PaymentRepository,
            useClass: PrismaPaymentRepository,
        },
    ],
})
export class PaymentModule {}