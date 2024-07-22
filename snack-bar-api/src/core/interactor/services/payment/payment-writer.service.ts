import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { StatusEnum } from '@/core/domain/order/status.entity';
import { Payment } from '@/core/domain/payment/payment.entity';
import { OrderWriterServicePort } from '@/core/interactor/port/order/order-writer-service.port';
import { PaymentWriterServicePort } from '@/core/interactor/port/payment/payment-writer-service.port';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';

export class PaymentWriterService implements PaymentWriterServicePort {
  constructor(private readonly paymentRepository: IPaymentRepository, private readonly orderWriterService: OrderWriterServicePort) { }

  async create(payment: Payment, orderId: string): Promise<Payment> {
    try {
      const createdPayment = await this.paymentRepository.create(payment);
      await this.orderWriterService.update({ id: orderId, status: StatusEnum.RECEIVED, paymentId: createdPayment.id, orderCode: null, clientId: null });

      return createdPayment;
    } catch (error) {
      throw new InternalServerErrorException({
        description: 'Failed to create payment',
      });
    }
  }
}
