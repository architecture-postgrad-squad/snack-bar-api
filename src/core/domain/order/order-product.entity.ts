import { Client } from "../client/client.entity";
import { Payment } from "../payment/payment.entity";
import { Product } from "../product/product.entity";
import { StatusEnum } from "./status.entity";

export class OrderProduct {
    readonly id: string;
    readonly client: Omit<Client, 'isValid'>;
    readonly payment: Payment;
    readonly orderCode: number;
    readonly status: StatusEnum;
    readonly products: Product[];
}