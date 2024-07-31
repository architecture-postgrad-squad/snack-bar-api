import { StatusEnum } from '@/core/domain/order/status.entity';
import { Payment } from '@/core/domain/payment/payment.entity';
import { StatusEnum as PaymentStatusEnum } from '@/core/domain/payment/status.entity';
import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { UpdatePaymentServicePort } from '@/core/interactor/port/payment/update-payment-service.port';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';
import { UpdatePaymentResponseDto } from '@/transport/dto/payment/response/update-success-response.dto';
import { FindOrderByPaymentUseCasesPort } from '../../port/order/find-order-by-payment-use-cases.port';
import { UpdateOrderUseCasesPort } from '../../port/order/update-order-use-cases.port';

export class UpdatePaymentUseCase implements UpdatePaymentServicePort {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly mercadoPagoAdapterService: MercadoPagoServicePort,
    private readonly findOrderByPaymentUseCases: FindOrderByPaymentUseCasesPort,
    private readonly updateOrderUseCases: UpdateOrderUseCasesPort,
  ) {}

  async execute(id: string): Promise<UpdatePaymentResponseDto> {
    const payment = await this.fetchPayment(id);

    if (payment.status === PaymentStatusEnum.APPROVED) {
      await this.updateOrder(payment);
    }

    const paymentRegister = await this.updatePaymentRegister(payment);

    return paymentRegister;
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

  private async updateOrder(payment: Payment): Promise<void> {
    try {
      const order = await this.findOrderByPaymentUseCases.execute(payment.id);
      await this.updateOrderUseCases.execute({
        ...order,
        status: StatusEnum.RECEIVED,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
