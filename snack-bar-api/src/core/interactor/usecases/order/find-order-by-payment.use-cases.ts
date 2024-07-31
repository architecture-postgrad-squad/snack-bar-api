import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { FindOrderByPaymentUseCasesPort } from '@/core/interactor/port/order/find-order-by-payment-use-cases.port';
import { IOrderRepository } from '@/core/repository/order/order.respository';

export class FindOrderByPaymentUseCases implements FindOrderByPaymentUseCasesPort {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string) {
    const order = await this.orderRepository.findOrderByPayment(id);

    if (!order) {
      throw new NotFoundException({ description: 'Order not found' });
    }

    return order;
  }
}
