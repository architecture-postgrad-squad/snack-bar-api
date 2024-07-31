import { StatusEnum } from '@/core/domain/order/status.entity';
import { CreateOrderUseCases } from '@/core/interactor/usecases/order/create-order.use-cases';
import { IOrderRepository } from '@/core/repository/order/order.respository';

describe('CreateOrderUseCases', () => {
  let useCase: CreateOrderUseCases;
  let orderRepository: IOrderRepository;

  beforeEach(async () => {
    orderRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findOrderById: jest.fn(),
      findOrderProductById: jest.fn(),
      findOrderByPayment: jest.fn(),
      findAllOrderProduct: jest.fn(),
    };

    useCase = new CreateOrderUseCases(orderRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an order and return it', async () => {
    const order = {
      id: '1',
      clientId: '1',
      paymentId: '1',
      orderCode: 1,
      status: StatusEnum.WAITING_PAYMENT,
    };

    jest.spyOn(orderRepository, 'create').mockResolvedValue(order);

    expect(await useCase.execute(order, ['1'])).toBe(order);
    expect(orderRepository.create).toHaveBeenCalledWith(order, ['1']);
  });
});
