import { PaymentService } from '@/domain/interactor/payment/payment.service';
import { PaymentServicePort } from '@/domain/interactor/port/payment-service.port';
import { PaymentRepository } from '@/domain/repository/payment/payment.repository';
import { PrismaPaymentRepository } from '@/infrastructure/persistence/prisma/prisma-payment.repository';
import { PaymentController } from '@/transport/controller/payment/payment.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.config';

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
