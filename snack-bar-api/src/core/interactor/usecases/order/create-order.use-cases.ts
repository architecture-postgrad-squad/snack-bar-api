import { Order } from '@/core/domain/order/order.entity';
import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { CreateOrderUseCasesPort } from '@/core/interactor/port/order/create-order-use-cases.port';
import { IOrderRepository } from '@/core/repository/order/order.respository';

export class CreateOrderUseCases implements CreateOrderUseCasesPort {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(order: Order, productsIds: string[]) {
    try {
      const createdOrder = await this.orderRepository.create(order, productsIds);
      return createdOrder;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
