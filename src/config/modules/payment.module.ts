import { PrismaService } from '@/config/prisma.config';
import { PaymentPostgresAdapter } from '@/datasource/adapter/payment/payment-postgres.adapter';
import { PaymentWriterServicePort } from '@/core/interactor/port/payment/payment-writer-service.port';
import { PaymentWriterService } from '@/core/interactor/services/payment/payment-writer.service';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { PaymentController } from '@/transport/controller/payment.controller';
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
      useClass: PaymentPostgresAdapter,
    },
  ],
})
export class PaymentModule {}
