import { FindAllOrdersUseCasesPort } from '@/core/interactor/port/order/find-all-orders-use-cases.port';
import { IOrderRepository } from '@/core/repository/order/order.respository';

export class FindAllOrdersUseCases implements FindAllOrdersUseCasesPort {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute() {
    return await this.orderRepository.findAllOrderProduct();
  }
}
