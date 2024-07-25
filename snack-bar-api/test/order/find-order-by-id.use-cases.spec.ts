import { StatusEnum } from '@/core/domain/order/status.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { FindOrderByIdUseCases } from '@/core/interactor/usecases/order/find-order-by-id.use-cases';
import { IOrderRepository } from '@/core/repository/order/order.respository';

describe('FindOrderByIdUseCases', () => {
  let useCase: FindOrderByIdUseCases;
  let orderRepository: IOrderRepository;

  const expectedOrder = {
    id: '1',
    clientId: '1',
    paymentId: '1',
    orderCode: 1,
    status: StatusEnum.IN_PROGRESS,
    createdAt: new Date('2023-07-01T09:00:00Z'),
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
      findAllOrderProduct: jest.fn(),
    };

    useCase = new FindOrderByIdUseCases(orderRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('findById', () => {
    it('should return an order if found', async () => {
      jest
        .spyOn(orderRepository, 'findOrderProductById')
        .mockResolvedValue(expectedOrder);

      expect(await useCase.execute('1')).toBe(expectedOrder);
      expect(orderRepository.findOrderProductById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if order is not found', async () => {
      jest.spyOn(orderRepository, 'findOrderProductById').mockResolvedValue(null);

      await expect(useCase.execute('1')).rejects.toThrow(NotFoundException);
      expect(orderRepository.findOrderProductById).toHaveBeenCalledWith('1');
    });
  });
});
