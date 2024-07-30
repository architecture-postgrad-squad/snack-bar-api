import { Client } from '@/core/domain/client/client.entity';
import { StatusEnum } from '@/core/domain/order/status.entity';
import { Payment } from '@/core/domain/payment/payment.entity';
import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { UpdateOrderUseCasesPort } from '@/core/interactor/port/order/update-order-use-cases.port';
import { CreatePixPaymentUseCasesPort } from '@/core/interactor/port/payment/create-payment-use-cases.port';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';

export class CreatePaymentUseCases implements CreatePixPaymentUseCasesPort {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly mercadoPagoAdapterService: MercadoPagoServicePort,
    private readonly updateOrderUseCases: UpdateOrderUseCasesPort,
  ) {}

  async execute(payment: Payment, client: Client, orderId: string): Promise<Payment> {
    try {
      const createdPayment = await this.paymentRepository.create(payment);
      const externalPayment = await this.mercadoPagoAdapterService.createPayment(
        createdPayment,
        client,
      );

      await this.updateOrderUseCases.execute({
        id: orderId,
        status: StatusEnum.WAITING_PAYMENT,
        paymentId: createdPayment.id,
        orderCode: null,
        clientId: null,
      });

      return externalPayment;
    } catch (error) {
      throw new InternalServerErrorException({
        description: 'Failed to create payment',
      });
    }
  }
}
