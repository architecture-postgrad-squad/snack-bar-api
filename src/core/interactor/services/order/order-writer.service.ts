import { IOrderRepository } from "@/core/repository/order/order.respository";
import { OrderWriterServicePort } from "../../port/order/order-writer-service.port";
import { Order } from "@/core/domain/order/order.entity";
import { InternalServerErrorException } from "@nestjs/common";
import { NotFoundException } from "@/config/exceptions/custom-exceptions/not-found.exception";

export class OrderWriterService implements OrderWriterServicePort {
    constructor(private readonly orderRepository: IOrderRepository) {
    }
    async create(order: Order, productsIds: string[]) {
        try {
            const createdOrder = await this.orderRepository.create(order, productsIds);
            return createdOrder;
        }
        catch (error) {
            throw new InternalServerErrorException();
        }
    }
    async update(order: Order) {
        const existingOrder = await this.orderRepository.findOrderById(order.id);

        if (!existingOrder) {
            throw new NotFoundException({description: 'Order not found'});
        }

        const updatedOrder = {} as Order;
        Object.keys(existingOrder).forEach((key) => updatedOrder[key] = order[key] || existingOrder[key]);

        return await this.orderRepository.update(updatedOrder);
    }
}