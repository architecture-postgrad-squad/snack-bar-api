import { Order } from '@/core/domain/order/order.entity';

export abstract class FindOrderByPaymentUseCasesPort {
  abstract execute(id: string): Promise<Order>;
}
