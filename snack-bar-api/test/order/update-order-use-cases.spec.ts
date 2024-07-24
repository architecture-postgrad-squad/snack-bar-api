import { StatusEnum } from '@/core/domain/order/status.entity';
import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { UpdateOrderUseCases } from '@/core/interactor/usecases/order/update-order.use-cases';
import { IOrderRepository } from '@/core/repository/order/order.respository';

describe('UpdateOrderUseCases', () => {
    let useCase: UpdateOrderUseCases;
    let orderRepository: IOrderRepository;

    beforeEach(async () => {
        orderRepository = {
            create: jest.fn(),
            update: jest.fn(),
            findOrderById: jest.fn(),
            findOrderProductById: jest.fn(),
            findAllOrderPrduct: jest.fn(),
        };

        useCase = new UpdateOrderUseCases(orderRepository);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });


    it('should update an order and return it', async () => {
        const order = {
            id: '1',
            clientId: '1',
            paymentId: '1',
            orderCode: 1,
            status: StatusEnum.RECEIVED,
        };

        const updatedOrder = {
            id: '1',
            clientId: '1',
            paymentId: '1',
            orderCode: 1,
            status: StatusEnum.IN_PROGRESS,
        };

        jest.spyOn(orderRepository, 'findOrderById').mockResolvedValue(order);
        jest.spyOn(orderRepository, 'update').mockResolvedValue(updatedOrder);

        expect(
            await useCase.execute({
                id: '1',
                orderCode: null,
                status: StatusEnum.IN_PROGRESS,
                clientId: null,
                paymentId: null,
            }),
        ).toBe(updatedOrder);
        expect(orderRepository.update).toHaveBeenCalledWith(updatedOrder);
    });

    it('should throw an error if order is not found', async () => {
        jest.spyOn(orderRepository, 'findOrderById').mockResolvedValue(null);

        await expect(
            useCase.execute({
                id: '1',
                orderCode: null,
                status: StatusEnum.IN_PROGRESS,
                clientId: null,
                paymentId: null,
            }),
        ).rejects.toThrow(NotFoundException);
        expect(orderRepository.findOrderById).toHaveBeenCalledWith('1');
    });

});
