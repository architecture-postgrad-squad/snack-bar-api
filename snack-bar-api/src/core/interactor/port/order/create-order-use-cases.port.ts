import { Order } from '@/core/domain/order/order.entity';

export abstract class CreateOrderUseCasesPort {
  abstract execute(order: Order, productsIds: string[]): Promise<Order>;
}
