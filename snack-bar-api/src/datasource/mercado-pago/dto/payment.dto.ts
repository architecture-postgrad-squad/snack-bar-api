import { MercadoPagoPayerDto } from './nested/payer.dto';
import { MercadoPagoTransactionDetailsDto } from './nested/transaction-details.dto';

export class MercadoPagoPaymentDto {
  readonly id: string;
  readonly date_created: string;
  readonly date_approved: string;
  readonly date_last_updated: string;
  readonly money_release_date: string;
  readonly payment_method_id: string;
  readonly payment_type_id: string;
  readonly status: string;
  readonly status_detail: string;
  readonly currency_id: string;
  readonly description: string;
  readonly collector_id: string;
  readonly payer: MercadoPagoPayerDto;
  readonly metadata: Object;
  readonly additional_info: Object;
  readonly external_reference: string;
  readonly transaction_amount: number;
  readonly transaction_amount_refunded: number;
  readonly coupon_amount: number;
  readonly transaction_details: MercadoPagoTransactionDetailsDto;
  readonly installments: number;
  readonly car: Object;
}

/* export const toDomain = (dto: CreatePaymentDto): Payment => {
  return new Payment(
    null,
    dto.value,
    dto.method,
  );
}; */
