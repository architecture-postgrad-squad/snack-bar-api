import { Payment } from '@/core/domain/payment/payment.entity';
import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import {
  MercadoPagoPaymentDto,
  toDomain,
} from '@/datasource/mercado-pago/dto/payment.dto';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';
import axios from 'axios';

export class MercadoPagoAdapter implements MercadoPagoServicePort {
  constructor() {}

  //TODO: update bearer token with valid one for testing
  api = axios.create({
    baseURL: 'https://api.mercadopago.com/v1',
    timeout: 1000,
    headers: {
      Authorization: 'Bearer f8f50e3e20d15-391569826',
    },
  });

  async getPaymentById(id: string): Promise<Payment> {
    const payment = await this.getById(id);
    return this.mercadoPagoPaymentToDomainPayment(payment);
  }

  private mercadoPagoPaymentToDomainPayment(payment: MercadoPagoPaymentDto): Payment {
    return toDomain(payment);
  }

  private async getById(id: string): Promise<MercadoPagoPaymentDto> {
    try {
      return await this.api.get(`/payments/${id}`);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        description: 'Third party API is out of service',
      });
    }
  }
}
