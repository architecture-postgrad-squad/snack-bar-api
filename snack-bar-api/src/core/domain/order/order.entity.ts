import { StatusEnum } from '@/core/domain/order/status.entity';

export class Order {
  readonly id: string;
  readonly clientId: string;
  readonly paymentId: string;
  readonly orderCode: number;
  readonly status: StatusEnum;

  constructor(
    id: string,
    clientId?: string,
    paymentId?: string,
    orderCode?: number,
    status?: StatusEnum,
  ) {
    this.id = id;
    this.clientId = clientId;
    this.paymentId = paymentId;
    this.orderCode = orderCode;
    this.status = status;
  }
}
