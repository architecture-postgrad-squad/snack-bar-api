import { Order } from "@/core/domain/order/order.entity";

export abstract class OrderReaderServicePort {
  abstract findById(id: string): Promise<Order>;
  abstract findAll(): Promise<Order[]>;
}