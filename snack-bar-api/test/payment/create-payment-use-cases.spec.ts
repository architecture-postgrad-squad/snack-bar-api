import { Order } from '@/core/domain/order/order.entity';
import { StatusEnum } from '@/core/domain/order/status.entity';
import { StatusEnum as PaymentStatusEnum } from '@/core/domain/payment/status.entity';

import { Payment } from '@/core/domain/payment/payment.entity';
import { UpdateOrderUseCasesPort } from '@/core/interactor/port/order/update-order-use-cases.port';
import { CreatePaymentUseCases } from '@/core/interactor/usecases/payment/create-pix-payment.use-cases';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';
import { CreatePaymentDto, toDomain } from '@/transport/dto/payment/request/payment.dto';

describe('CreatePaymentUseCases', () => {
  let useCase: CreatePaymentUseCases;
  let paymentRepository: IPaymentRepository;
  let mercadoPagoService: MercadoPagoServicePort;
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

    mercadoPagoService = {
      createPayment: jest.fn(),
      getPaymentById: jest.fn(),
    };

    useCase = new CreatePaymentUseCases(
      paymentRepository,
      mercadoPagoService,
      updateOrderUseCases,
    );
  });

  it('should create a payment and return it', async () => {
    const paymentDto: CreatePaymentDto = {
      value: 100,
      method: 'Credit Card',
      orderId: '1',
      client: {
        id: '1',
        name: 'Gandalf The Grey',
        email: 'galdanf@totr.com',
        cpf: '12345678900',
        isValid: jest.fn(),
      },
    };

    const expectedPayment: Payment = {
      ...paymentDto,
      id: 'some-id',
      externalId: 'some-id',
      status: PaymentStatusEnum.PENDING,
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
    jest.spyOn(mercadoPagoService, 'createPayment').mockResolvedValue(expectedPayment);
    jest.spyOn(updateOrderUseCases, 'execute').mockResolvedValue(expectedOrder);

    const result = await useCase.execute(
      toDomain(paymentDto),
      paymentDto.client,
      paymentDto.orderId,
    );
    expect(result).toEqual(expectedPayment);
    expect(paymentRepository.create).toHaveBeenCalledWith(toDomain(paymentDto));
  });

  it('should handle errors when creating a payment', async () => {
    const paymentDto: CreatePaymentDto = {
      value: 100,
      method: 'Credit Card',
      orderId: '1',
      client: {
        id: '1',
        name: 'Gandalf The Grey',
        email: 'galdanf@totr.com',
        cpf: '12345678900',
        isValid: jest.fn(),
      },
    };

    jest
      .spyOn(paymentRepository, 'create')
      .mockRejectedValue(new Error('Failed to create payment'));
    await expect(
      useCase.execute(toDomain(paymentDto), paymentDto.client, paymentDto.orderId),
    ).rejects.toThrow(Error);
  });
});
