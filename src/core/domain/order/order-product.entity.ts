import { Client } from "@/core/domain/client/client.entity";
import { StatusEnum } from "@/core/domain/order/status.entity";
import { Payment } from "@/core/domain/payment/payment.entity";
import { Product } from "@/core/domain/product/product.entity";

export class OrderProduct {
    readonly id: string;
    readonly client: Omit<Client, 'isValid'>;
    readonly payment: Payment;
    readonly orderCode: number;
    readonly status: StatusEnum;
    readonly products: Product[];
}