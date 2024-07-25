import { OrderProduct } from '@/core/domain/order/order-product.entity';
import { Order } from '@/core/domain/order/order.entity';

export abstract class IOrderRepository {
  abstract create(order: Order, productsIds: string[]): Promise<Order>;
  abstract update(order: Order): Promise<Order>;
  abstract findOrderById(id: string): Promise<Order>;

  abstract findOrderProductById(id: string): Promise<OrderProduct>;
  abstract findAllOrderProduct(): Promise<OrderProduct[]>;
}
