import { PrismaService } from '@/config/prisma.config';
import { PaymentWriterService } from '@/domain/interactor/payment/payment-writer.service';
import { PaymentWriterServicePort } from '@/domain/interactor/port/payment/payment-writer-service.port';
import { IPaymentRepository } from '@/domain/repository/payment/payment.repository';
import { PrismaPaymentRepository } from '@/infrastructure/persistence/prisma/prisma-payment.repository';
import { PaymentController } from '@/transport/controller/payment/payment.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    PrismaService,
    {
      provide: PaymentWriterServicePort,
      useFactory: (paymentRepository: IPaymentRepository) => {
        return new PaymentWriterService(paymentRepository);
      },
      inject: [IPaymentRepository],
    },
    {
      provide: IPaymentRepository,
      useClass: PrismaPaymentRepository,
    },
  ],
})
export class PaymentModule {}
