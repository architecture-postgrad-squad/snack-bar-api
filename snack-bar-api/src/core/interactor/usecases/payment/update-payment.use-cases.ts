import { Payment } from '@/core/domain/payment/payment.entity';
import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { UpdatePaymentServicePort } from '@/core/interactor/port/payment/update-payment-service.port';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';
import { UpdatePaymentResponseDto } from '@/transport/dto/payment/response/update-success-response.dto';

export class UpdatePaymentUseCase implements UpdatePaymentServicePort {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly mercadoPagoAdapterService: MercadoPagoServicePort,
  ) {}

  async execute(id: string): Promise<UpdatePaymentResponseDto> {
    const payment = await this.fetchPayment(id);
    return await this.updatePaymentRegister(payment);
  }

  private async fetchPayment(id: string): Promise<Payment> {
    return await this.mercadoPagoAdapterService.getPaymentById(id);
  }

  private async updatePaymentRegister(
    payment: Payment,
  ): Promise<UpdatePaymentResponseDto> {
    try {
      await this.paymentRepository.updateById(payment.id, payment);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return { message: 'Payment register was updated successfully' };
  }
}
