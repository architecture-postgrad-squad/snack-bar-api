import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma.config';
import { UpdateOrderUseCasesPort } from '@/core/interactor/port/order/update-order-use-cases.port';
import { CreatePaymentUseCasesPort } from '@/core/interactor/port/payment/create-payment-use-cases.port';
import { FindPaymentByIdUseCasesPort } from '@/core/interactor/port/payment/find-payment-by-id-use-cases.port';
import { UpdatePaymentServicePort } from '@/core/interactor/port/payment/update-payment-service.port';
import { UpdateOrderUseCases } from '@/core/interactor/usecases/order/update-order.use-cases';
import { CreatePaymentUseCases } from '@/core/interactor/usecases/payment/create-payment.use-cases';
import { FindPaymentByIdUseCases } from '@/core/interactor/usecases/payment/find-payment-by-id.use-cases';
import { UpdatePaymentUseCaseService } from '@/core/interactor/usecases/payment/update.usecase';
import { IOrderRepository } from '@/core/repository/order/order.respository';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { OrderPostgresAdapter } from '@/datasource/database/adapter/order/order-postgres.adapter';
import { PaymentPostgresAdapter } from '@/datasource/database/adapter/payment/payment-postgres.adapter';
import { MercadoPagoAdapter } from '@/datasource/mercado-pago/adapter/mercado-pago-adapter.service';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';
import { PaymentController } from '@/transport/controller/payment.controller';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    PrismaService,
    {
      provide: CreatePaymentUseCasesPort,
      useFactory: (
        paymentRepository: IPaymentRepository,
        updateOrderUseCases: UpdateOrderUseCasesPort,
      ) => {
        return new CreatePaymentUseCases(paymentRepository, updateOrderUseCases);
      },
      inject: [IPaymentRepository, UpdateOrderUseCasesPort],
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
      provide: FindPaymentByIdUseCasesPort,
      useFactory: (paymentRepository: IPaymentRepository) => {
        return new FindPaymentByIdUseCases(paymentRepository);
      },
      inject: [IPaymentRepository],
    },

    {
      provide: IPaymentRepository,
      useClass: PaymentPostgresAdapter,
    },
    {
      provide: UpdateOrderUseCasesPort,
      useFactory: (orderRepository: IOrderRepository) => {
        return new UpdateOrderUseCases(orderRepository);
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
