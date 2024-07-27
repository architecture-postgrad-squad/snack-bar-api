import { MercadoPagoPaymentDto } from '@/datasource/mercado-pago/dto/payment.dto';

export abstract class MercadoPagoServicePort {
  abstract execute(identifier: string): Promise<MercadoPagoPaymentDto>;
}
