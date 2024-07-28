import { PrismaService } from '@/config/prisma.config';
import { OrderWriterServicePort } from '@/core/interactor/port/order/order-writer-service.port';
import { PaymentReaderServicePort } from '@/core/interactor/port/payment/payment-reader-service.port';
import { PaymentWriterServicePort } from '@/core/interactor/port/payment/payment-writer-service.port';
import { UpdatePaymentServicePort } from '@/core/interactor/port/payment/update-payment-service.port';
import { OrderWriterService } from '@/core/interactor/services/order/order-writer.service';
import { PaymentReaderService } from '@/core/interactor/services/payment/payment-reader.service';
import { PaymentWriterService } from '@/core/interactor/services/payment/payment-writer.service';
import { UpdatePaymentUseCaseService } from '@/core/interactor/services/payment/update-usecase.service';
import { IOrderRepository } from '@/core/repository/order/order.respository';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { OrderPostgresAdapter } from '@/datasource/database/adapter/order/order-postgres.adapter';
import { PaymentPostgresAdapter } from '@/datasource/database/adapter/payment/payment-postgres.adapter';
import { MercadoPagoAdapter } from '@/datasource/mercado-pago/adapter/mercado-pago-adapter.service';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';
import { PaymentController } from '@/transport/controller/payment.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    PrismaService,
    {
      provide: PaymentWriterServicePort,
      useFactory: (
        paymentRepository: IPaymentRepository,
        orderWriterService: OrderWriterServicePort,
      ) => {
        return new PaymentWriterService(paymentRepository, orderWriterService);
      },
      inject: [IPaymentRepository, OrderWriterServicePort],
    },
    {
      provide: MercadoPagoServicePort,
      useClass: MercadoPagoAdapter,
    },
    {
      provide: UpdatePaymentServicePort,
      useFactory: (
        paymentRepository: IPaymentRepository,
        mercadoPagoAdapter: MercadoPagoServicePort,
      ) => {
        return new UpdatePaymentUseCaseService(paymentRepository, mercadoPagoAdapter);
      },
      inject: [IPaymentRepository, MercadoPagoServicePort],
    },
    {
      provide: PaymentReaderServicePort,
      useFactory: (paymentRepository: IPaymentRepository) => {
        return new PaymentReaderService(paymentRepository);
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
export class PaymentModule {}
