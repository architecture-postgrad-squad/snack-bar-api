import { IOrderRepository } from "@/core/repository/order/order.respository";
import { NotFoundException } from "@nestjs/common";

export class OrderReaderService {
    constructor(private readonly orderRepository: IOrderRepository) {
    }
    async findById(id: string) {
        const order = await this.orderRepository.findOrderProductById(id);

        if (!order) {
            throw new NotFoundException({description: 'Order not found'});
        }

        return order;
    }
    async findAll() {
        return await this.orderRepository.findAllOrderPrduct();
    }
}