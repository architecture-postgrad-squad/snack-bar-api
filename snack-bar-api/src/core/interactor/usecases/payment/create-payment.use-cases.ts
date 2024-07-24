import { StatusEnum } from '@/core/domain/order/status.entity';
import { Payment } from '@/core/domain/payment/payment.entity';
import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { UpdateOrderUseCasesPort } from '@/core/interactor/port/order/update-order-use-cases.port';
import { CreatePaymentUseCasesPort } from '@/core/interactor/port/payment/create-payment-use-cases.port';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';

export class CreatePaymentUseCases implements CreatePaymentUseCasesPort {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly updateOrderUseCases: UpdateOrderUseCasesPort,
  ) {}

  async execute(payment: Payment, orderId: string): Promise<Payment> {
    try {
      const createdPayment = await this.paymentRepository.create(payment);
      await this.updateOrderUseCases.execute({
        id: orderId,
        status: StatusEnum.RECEIVED,
        paymentId: createdPayment.id,
        orderCode: null,
        clientId: null,
      });

      return createdPayment;
    } catch (error) {
      throw new InternalServerErrorException({
        description: 'Failed to create payment',
      });
    }
  }
}
