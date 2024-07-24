import { Order } from '@/core/domain/order/order.entity';
import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { UpdateOrderUseCasesPort } from '@/core/interactor/port/order/update-order-use-cases.port';
import { IOrderRepository } from '@/core/repository/order/order.respository';

export class UpdateOrderUseCases implements UpdateOrderUseCasesPort {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(order: Order) {
    const existingOrder = await this.orderRepository.findOrderById(order.id);

    if (!existingOrder) {
      throw new NotFoundException({ description: 'Order not found' });
    }

    const updatedOrder = {} as Order;
    Object.keys(existingOrder).forEach(
      (key) => (updatedOrder[key] = order[key] || existingOrder[key]),
    );

    return await this.orderRepository.update(updatedOrder);
  }
}
