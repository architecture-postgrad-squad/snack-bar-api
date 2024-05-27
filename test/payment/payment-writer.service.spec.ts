import { Order } from '@/core/domain/order/order.entity';
import { StatusEnum } from '@/core/domain/order/status.entity';
import { Payment } from '@/core/domain/payment/payment.entity';
import { OrderWriterServicePort } from '@/core/interactor/port/order/order-writer-service.port';
import { PaymentWriterService } from '@/core/interactor/services/payment/payment-writer.service';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { CreatePaymentDto, toDomain } from '@/transport/dto/payment/request/payment.dto';
import { HttpException } from '@nestjs/common';

describe('PaymentService', () => {
  let service: PaymentWriterService;
  let paymentRepository: IPaymentRepository;
  let orderWriterService: OrderWriterServicePort;

  beforeEach(async () => {
    paymentRepository = {
      create: jest.fn((payment) =>
        Promise.resolve({ ...payment, id: 'some-id', createdAt: new Date() }),
      ),
    };

    orderWriterService = {
      create: jest.fn((order) => Promise.resolve({ ...order, id: '1' })),
      update: jest.fn((order) =>
        Promise.resolve({ id: order.id, status: order.status, orderCode: 1, clientId: '1', paymentId: 'some-id', createdAt: new Date() }),
      ),
    };

    service = new PaymentWriterService(paymentRepository, orderWriterService);
  });

  it('should create a payment and return it', async () => {
    const paymentDto: CreatePaymentDto = {
      value: 100,
      method: 'Credit Card',
      orderId: '1'
    };

    const expectedPayment: Payment = {
      ...paymentDto,
      id: 'some-id',
      createdAt: expect.any(Date),
    };

    const expectedOrder: Order = {
      id: '1',
      status: StatusEnum.RECEIVED,
      orderCode: 1,
      clientId: '1',
      paymentId: expectedPayment.id
    }

    jest.spyOn(paymentRepository, 'create').mockResolvedValue(expectedPayment);
    jest.spyOn(orderWriterService, 'update').mockResolvedValue(expectedOrder);

    const result = await service.create(toDomain(paymentDto), paymentDto.orderId);
    expect(result).toEqual(expectedPayment);
    expect(paymentRepository.create).toHaveBeenCalledWith(toDomain(paymentDto));
  });

  it('should handle errors when creating a payment', async () => {
    const paymentDto: CreatePaymentDto = {
      value: 100,
      method: 'Credit Card',
      orderId: '1'
    };

    jest
      .spyOn(paymentRepository, 'create')
      .mockRejectedValue(new Error('Failed to create payment'));
    await expect(service.create(toDomain(paymentDto), paymentDto.orderId)).rejects.toThrow(HttpException);
  });
});
