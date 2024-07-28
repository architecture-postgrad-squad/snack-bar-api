import { Order } from '@/core/domain/order/order.entity';
import { StatusEnum } from '@/core/domain/order/status.entity';
import { Payment } from '@/core/domain/payment/payment.entity';
import { UpdateOrderUseCasesPort } from '@/core/interactor/port/order/update-order-use-cases.port';
import { CreatePaymentUseCases } from '@/core/interactor/usecases/payment/create-payment.use-cases';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { CreatePaymentDto, toDomain } from '@/transport/dto/payment/request/payment.dto';

describe('CreatePaymentUseCases', () => {
  let useCase: CreatePaymentUseCases;
  let paymentRepository: IPaymentRepository;
  let updateOrderUseCases: UpdateOrderUseCasesPort;

  beforeEach(async () => {
    paymentRepository = {
      create: jest.fn((payment) =>
        Promise.resolve({ ...payment, id: 'some-id', createdAt: new Date() }),
      ),
      findById: jest.fn(),
      updateById: jest.fn(),
    };

    updateOrderUseCases = {
      execute: jest.fn((order) =>
        Promise.resolve({
          id: order.id,
          status: order.status,
          orderCode: 1,
          clientId: '1',
          paymentId: 'some-id',
          createdAt: new Date(),
        }),
      ),
    };

    useCase = new CreatePaymentUseCases(paymentRepository, updateOrderUseCases);
  });

  it('should create a payment and return it', async () => {
    const paymentDto: CreatePaymentDto = {
      value: 100,
      method: 'Credit Card',
      orderId: '1',
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
      paymentId: expectedPayment.id,
    };

    jest.spyOn(paymentRepository, 'create').mockResolvedValue(expectedPayment);
    jest.spyOn(updateOrderUseCases, 'execute').mockResolvedValue(expectedOrder);

    const result = await useCase.execute(toDomain(paymentDto), paymentDto.orderId);
    expect(result).toEqual(expectedPayment);
    expect(paymentRepository.create).toHaveBeenCalledWith(toDomain(paymentDto));
  });

  it('should handle errors when creating a payment', async () => {
    const paymentDto: CreatePaymentDto = {
      value: 100,
      method: 'Credit Card',
      orderId: '1',
    };

    jest
      .spyOn(paymentRepository, 'create')
      .mockRejectedValue(new Error('Failed to create payment'));
    await expect(
      useCase.execute(toDomain(paymentDto), paymentDto.orderId),
    ).rejects.toThrow(Error);
  });
});
