import { StatusEnum } from '@/core/domain/order/status.entity';
import { StatusEnum as PaymentStatusEnum } from '@/core/domain/payment/status.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { FindAllOrdersUseCases } from '@/core/interactor/usecases/order/find-all-orders.use-cases';
import { IOrderRepository } from '@/core/repository/order/order.respository';

describe('FindAllOrdersUseCases', () => {
  let useCase: FindAllOrdersUseCases;
  let orderRepository: IOrderRepository;

  const order1 = {
    id: '1',
    clientId: '1',
    paymentId: '1',
    orderCode: 1,
    status: StatusEnum.DONE,
    createdAt: new Date('2023-07-01T07:00:00Z'),
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
      externalId: '123',
      status: PaymentStatusEnum.APPROVED,
      createdAt: new Date(),
    },
  };

  const order2 = {
    id: '2',
    clientId: '2',
    paymentId: '2',
    orderCode: 2,
    status: StatusEnum.RECEIVED,
    createdAt: new Date('2023-07-01T08:00:00Z'),
    products: [
      {
        id: '2',
        name: 'X Egg',
        category: CategoryEnum.BURGUER,
        price: 19.99,
      },
    ],
    client: {
      id: '2',
      name: 'Frodo Baggins',
      email: 'frodo.baggins@example.com',
      cpf: '12345678900',
    },
    payment: {
      id: '2',
      value: 100,
      method: 'credit_card',
      externalId: '123',
      status: PaymentStatusEnum.APPROVED,
      createdAt: new Date(),
    },
  };

  const order3 = {
    id: '3',
    clientId: '3',
    paymentId: '3',
    orderCode: 3,
    status: StatusEnum.IN_PROGRESS,
    createdAt: new Date('2023-07-01T09:00:00Z'),
    products: [
      {
        id: '3',
        name: 'Veggie Burger',
        category: CategoryEnum.BURGUER,
        price: 22.99,
      },
    ],
    client: {
      id: '3',
      name: 'Samwise Gamgee',
      email: 'samwise.gamgee@example.com',
      cpf: '98765432100',
    },
    payment: {
      id: '3',
      value: 100,
      method: 'credit_card',
      externalId: '123',
      status: PaymentStatusEnum.APPROVED,
      createdAt: new Date(),
    },
  };

  const order4 = {
    id: '4',
    clientId: '4',
    paymentId: '4',
    orderCode: 4,
    status: StatusEnum.IN_PROGRESS,
    createdAt: new Date('2023-07-01T10:00:00Z'),
    products: [
      {
        id: '4',
        name: 'Chicken Sandwich',
        category: CategoryEnum.BURGUER,
        price: 20.99,
      },
    ],
    client: {
      id: '4',
      name: 'Legolas',
      email: 'legolas@example.com',
      cpf: '11223344556',
    },
    payment: {
      id: '4',
      value: 100,
      method: 'credit_card',
      externalId: '123',
      status: PaymentStatusEnum.APPROVED,
      createdAt: new Date(),
    },
  };

  beforeEach(() => {
    orderRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findOrderById: jest.fn(),
      findOrderProductById: jest.fn(),
      findOrderByPayment: jest.fn(),
      findAllOrderProduct: jest.fn(),
    };

    useCase = new FindAllOrdersUseCases(orderRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('findAll', () => {
    it('should return orders sorted by status and createdAt', async () => {
      jest
        .spyOn(orderRepository, 'findAllOrderProduct')
        .mockResolvedValue([order1, order3, order4, order2]);

      const result = await useCase.execute();

      expect(result).toHaveLength(4);
      expect(orderRepository.findAllOrderProduct).toHaveBeenCalledWith();

      expect(result[0].status).toBe(StatusEnum.DONE);
      expect(result[1].status).toBe(StatusEnum.IN_PROGRESS);
      expect(result[1].id).toEqual(order3.id);
      expect(result[2].status).toBe(StatusEnum.IN_PROGRESS);
      expect(result[2].id).toEqual(order4.id);
      expect(result[3].status).toBe(StatusEnum.RECEIVED);
    });

    it('should return an empty array if no order was found', async () => {
      jest.spyOn(orderRepository, 'findAllOrderProduct').mockResolvedValue([]);

      expect(await useCase.execute()).toHaveLength(0);
      expect(orderRepository.findAllOrderProduct).toHaveBeenCalledWith();
    });
  });
});
