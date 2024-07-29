import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma.config';
import { CreateOrderUseCasesPort } from '@/core/interactor/port/order/create-order-use-cases.port';
import { FindAllOrdersUseCasesPort } from '@/core/interactor/port/order/find-all-orders-use-cases.port';
import { FindOrderByIdUseCasesPort } from '@/core/interactor/port/order/find-order-by-id-use-cases.port';
import { UpdateOrderUseCasesPort } from '@/core/interactor/port/order/update-order-use-cases.port';
import { CreateOrderUseCases } from '@/core/interactor/usecases/order/create-order.use-cases';
import { FindAllOrdersUseCases } from '@/core/interactor/usecases/order/find-all-orders.use-cases';
import { FindOrderByIdUseCases } from '@/core/interactor/usecases/order/find-order-by-id.use-cases';
import { UpdateOrderUseCases } from '@/core/interactor/usecases/order/update-order.use-cases';
import { IOrderRepository } from '@/core/repository/order/order.respository';
import { OrderPostgresAdapter } from '@/datasource/database/adapter/order/order-postgres.adapter';
import { OrderController } from '@/transport/controller/order.controller';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    PrismaService,
    {
      provide: CreateOrderUseCasesPort,
      useFactory: (orderRepository: IOrderRepository) => {
        return new CreateOrderUseCases(orderRepository);
      },
      inject: [IOrderRepository],
    },
    {
      provide: UpdateOrderUseCasesPort,
      useFactory: (orderRepository: IOrderRepository) => {
        return new UpdateOrderUseCases(orderRepository);
      },
      inject: [IOrderRepository],
    },
    {
      provide: FindAllOrdersUseCasesPort,
      useFactory: (orderRepository: IOrderRepository) => {
        return new FindAllOrdersUseCases(orderRepository);
      },
      inject: [IOrderRepository],
    },
    {
      provide: FindOrderByIdUseCasesPort,
      useFactory: (orderRepository: IOrderRepository) => {
        return new FindOrderByIdUseCases(orderRepository);
      },
      inject: [IOrderRepository],
    },
    {
      provide: IOrderRepository,
      useClass: OrderPostgresAdapter,
    },
  ],
  exports: [],
})
export class OrderModule {}
