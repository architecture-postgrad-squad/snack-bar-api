import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';

export class GetPaymentByMercadoPagoUseCaseService {
  constructor(private readonly mercadoPagoAdapter: MercadoPagoServicePort) {}

  async execute(id: string): Promise<any> {
    try {
      return this.mercadoPagoAdapter.execute(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
