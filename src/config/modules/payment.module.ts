import { PrismaService } from '@/config/prisma.config';
import { OrderWriterServicePort } from '@/core/interactor/port/order/order-writer-service.port';
import { PaymentWriterServicePort } from '@/core/interactor/port/payment/payment-writer-service.port';
import { OrderWriterService } from '@/core/interactor/services/order/order-writer.service';
import { PaymentWriterService } from '@/core/interactor/services/payment/payment-writer.service';
import { IOrderRepository } from '@/core/repository/order/order.respository';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { OrderPostgresAdapter } from '@/datasource/adapter/order/order-postgres.adapter';
import { PaymentPostgresAdapter } from '@/datasource/adapter/payment/payment-postgres.adapter';
import { PaymentController } from '@/transport/controller/payment.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    PrismaService,
    {
      provide: PaymentWriterServicePort,
      useFactory: (paymentRepository: IPaymentRepository, orderWriterService: OrderWriterServicePort) => {
        return new PaymentWriterService(paymentRepository, orderWriterService);
      },
      inject: [IPaymentRepository, OrderWriterServicePort],
    },
    {
      provide: IPaymentRepository,
      useClass: PaymentPostgresAdapter,
    },
    {
      provide: OrderWriterServicePort,
      useFactory: (orderRepository: IOrderRepository) => {
        return new OrderWriterService(orderRepository);
      },
      inject: [IOrderRepository],
    },
    {
      provide: IOrderRepository,
      useClass: OrderPostgresAdapter,
    },
  ],
})
export class PaymentModule { }
