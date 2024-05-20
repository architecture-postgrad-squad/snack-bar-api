import { PrismaService } from '@/config/prisma.config';
import { PaymentPostgresAdapter } from '@/datasource/adapter/payment/payment-postgres.adapter';
import { PaymentWriterService } from '@/domain/interactor/payment/payment-writer.service';
import { PaymentWriterServicePort } from '@/domain/interactor/port/payment/payment-writer-service.port';
import { IPaymentRepository } from '@/domain/repository/payment/payment.repository';
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
