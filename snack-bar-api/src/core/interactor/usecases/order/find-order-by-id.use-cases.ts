import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { FindOrderByIdUseCasesPort } from '@/core/interactor/port/order/find-order-by-id-use-cases.port';
import { IOrderRepository } from '@/core/repository/order/order.respository';

export class FindOrderByIdUseCases implements FindOrderByIdUseCasesPort {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string) {
    const order = await this.orderRepository.findOrderProductById(id);

    if (!order) {
      throw new NotFoundException({ description: 'Order not found' });
    }

    return order;
  }
}
