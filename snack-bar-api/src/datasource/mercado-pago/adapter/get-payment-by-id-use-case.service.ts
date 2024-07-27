import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MercadoPagoPaymentDto } from '../dto/payment.dto';

@Injectable()
export class GetPaymentByIdMercadoPagoAdapter {
  constructor() {}

  //TODO: update bearer token with valid one for testing
  api = axios.create({
    baseURL: 'https://api.mercadopago.com/v1',
    timeout: 1000,
    headers: {
      Authorization: 'Bearer f8f50e3e20d15-391569826',
    },
  });

  async execute(id: string): Promise<MercadoPagoPaymentDto> {
    try {
      return this.api.get(`/payments/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
}
