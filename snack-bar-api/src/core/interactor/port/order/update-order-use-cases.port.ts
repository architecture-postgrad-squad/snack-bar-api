import { Order } from '@/core/domain/order/order.entity';

export abstract class UpdateOrderUseCasesPort {
  abstract execute(order: Order): Promise<Order>;
}
