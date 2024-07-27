import { Payment } from '@/core/domain/payment/payment.entity';
import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { UpdatePaymentServicePort } from '@/core/interactor/port/payment/update-payment-service.port';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';

export class UpdatePaymentUseCaseService implements UpdatePaymentServicePort {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly mercadoPagoAdapter: MercadoPagoServicePort,
  ) {}

  //TODO: implement unit tests
  async execute(id: string): Promise<any> {
    const payment = await this.fetchPayment(id);
    //TODO: Implement toDomain transformer for mercado pago datasource
    // return this.updatePaymentRegister(payment;)
    return;
  }

  private async fetchPayment(id: string) {
    try {
      return await this.mercadoPagoAdapter.execute(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async updatePaymentRegister(payment: Payment) {
    try {
      return await this.paymentRepository.updateById(payment.id, payment);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
