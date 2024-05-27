import { NotFoundException } from "@/config/exceptions/custom-exceptions/not-found.exception";
import { IOrderRepository } from "@/core/repository/order/order.respository";

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