import { OrderProduct } from '@/core/domain/order/order-product.entity';

export abstract class FindAllOrdersUseCasesPort {
  abstract execute(): Promise<OrderProduct[]>;
}
