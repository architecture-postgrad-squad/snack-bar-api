import { PrismaService } from "@/config/prisma.config";
import { OrderReaderServicePort } from "@/core/interactor/port/order/order-reader-service.port";
import { OrderWriterServicePort } from "@/core/interactor/port/order/order-writer-service.port";
import { OrderReaderService } from "@/core/interactor/services/order/order-reader.service";
import { OrderWriterService } from "@/core/interactor/services/order/order-writer.service";
import { IOrderRepository } from "@/core/repository/order/order.respository";
import { OrderPostgresAdapter } from "@/datasource/adapter/order/order-postgres.adapter";
import { OrderController } from "@/transport/controller/order.controller";
import { Module } from "@nestjs/common";


@Module({
    imports: [],
    controllers: [OrderController],
    providers: [
        PrismaService,
        {
            provide: OrderWriterServicePort,
            useFactory: (orderRepository: IOrderRepository) => {
                return new OrderWriterService(orderRepository);
            },
            inject: [IOrderRepository],
        },
        {
            provide: OrderReaderServicePort,
            useFactory: (orderRepository: IOrderRepository) => {
                return new OrderReaderService(orderRepository);
            },
            inject: [IOrderRepository],
        },
        {
            provide: IOrderRepository,
            useClass: OrderPostgresAdapter,
        },
    ],
    exports: []
})


export class OrderModule { }