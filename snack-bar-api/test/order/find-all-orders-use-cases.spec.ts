import { StatusEnum } from '@/core/domain/order/status.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { FindAllOrdersUseCases } from '@/core/interactor/usecases/order/find-all-orders.use-cases';
import { IOrderRepository } from '@/core/repository/order/order.respository';

describe('FindAllOrdersUseCases', () => {
  let useCase: FindAllOrdersUseCases;
  let orderRepository: IOrderRepository;

  const expectedOrder = {
    id: '1',
    clientId: '1',
    paymentId: '1',
    orderCode: 1,
    status: StatusEnum.IN_PROGRESS,
    products: [
      {
        id: '1',
        name: 'X Bacon',
        category: CategoryEnum.BURGUER,
        price: 24.99,
      },
    ],
    client: {
      id: '1',
      name: 'Gandalf The Grey',
      email: 'gandalf.grey@example.com',
      cpf: '49744639857',
    },
    payment: {
      id: '1',
      value: 100,
      method: 'credit_card',
      createdAt: new Date(),
    },
  };

  beforeEach(() => {
    orderRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findOrderById: jest.fn(),
      findOrderProductById: jest.fn(),
      findAllOrderPrduct: jest.fn(),
    };

    useCase = new FindAllOrdersUseCases(orderRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('findAll', () => {
    it('should return orders if found', async () => {
      jest
        .spyOn(orderRepository, 'findAllOrderPrduct')
        .mockResolvedValue([expectedOrder]);

      expect(await useCase.execute()).toHaveLength(1);
      expect(orderRepository.findAllOrderPrduct).toHaveBeenCalledWith();
    });

    it('should return an empty array if no order was found', async () => {
      jest.spyOn(orderRepository, 'findAllOrderPrduct').mockResolvedValue([]);

      expect(await useCase.execute()).toHaveLength(0);
      expect(orderRepository.findAllOrderPrduct).toHaveBeenCalledWith();
    });
  });
});
