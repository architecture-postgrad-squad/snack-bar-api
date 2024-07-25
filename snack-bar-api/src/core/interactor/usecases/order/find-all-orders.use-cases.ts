import { OrderProduct } from '@/core/domain/order/order-product.entity';
import { StatusEnum } from '@/core/domain/order/status.entity';
import { FindAllOrdersUseCasesPort } from '@/core/interactor/port/order/find-all-orders-use-cases.port';
import { IOrderRepository } from '@/core/repository/order/order.respository';

export class FindAllOrdersUseCases implements FindAllOrdersUseCasesPort {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<OrderProduct[]> {
    const orders = await this.orderRepository.findAllOrderProduct();

    const sortOrder = [StatusEnum.DONE, StatusEnum.IN_PROGRESS, StatusEnum.RECEIVED];

    const sortedOrders = orders.sort((a, b) => {
      const aStatusIndex = sortOrder.indexOf(a.status as StatusEnum);
      const bStatusIndex = sortOrder.indexOf(b.status as StatusEnum);
      if (aStatusIndex !== bStatusIndex) {
        return aStatusIndex - bStatusIndex;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return sortedOrders;
  }
}
