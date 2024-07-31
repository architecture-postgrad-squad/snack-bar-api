import { OrderProduct } from '@/core/domain/order/order-product.entity';

export abstract class FindOrderByIdUseCasesPort {
  abstract execute(id: string): Promise<OrderProduct>;
}
