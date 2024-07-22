import { Order } from "@/core/domain/order/order.entity";

export abstract class OrderWriterServicePort {
  abstract create(order: Order, productsIds: string[]): Promise<Order>;
  abstract update(order: Order): Promise<Order>;
}