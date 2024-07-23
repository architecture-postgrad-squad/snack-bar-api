import { NotFoundException } from "@/core/exceptions/custom-exceptions/not-found.exception";
import { StatusEnum } from "@/core/domain/order/status.entity";
import { OrderWriterService } from "@/core/interactor/services/order/order-writer.service";
import { IOrderRepository } from "@/core/repository/order/order.respository";


describe('OrderWriterService', () => {
    let service: OrderWriterService;
    let orderRepository: IOrderRepository;

    beforeEach(async () => {
        orderRepository = {
            create: jest.fn(),
            update: jest.fn(),
            findOrderById: jest.fn(),
            findOrderProductById: jest.fn(),
            findAllOrderPrduct: jest.fn(),
        };

        service = new OrderWriterService(orderRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create an order and return it', async () => {
            const order = {
                id: '1',
                clientId: '1',
                paymentId: '1',
                orderCode: 1,
                status: StatusEnum.WAITING_PAYMENT,
            }

            jest.spyOn(orderRepository, 'create').mockResolvedValue(order);

            expect(await service.create(order, ['1'])).toBe(order);
            expect(orderRepository.create).toHaveBeenCalledWith(order, ['1']);
        })
    })
    describe('update', () => {
        it('should update an order and return it', async () => {
            const order = {
                id: '1',
                clientId: '1',
                paymentId: '1',
                orderCode: 1,
                status: StatusEnum.RECEIVED,
            }

            const updatedOrder = {
                id: '1',
                clientId: '1',
                paymentId: '1',
                orderCode: 1,
                status: StatusEnum.IN_PROGRESS,
            }

            jest.spyOn(orderRepository, 'findOrderById').mockResolvedValue(order);
            jest.spyOn(orderRepository, 'update').mockResolvedValue(updatedOrder);

            expect(await service.update({ id: '1', orderCode: null, status: StatusEnum.IN_PROGRESS, clientId: null, paymentId: null })).toBe(updatedOrder);
            expect(orderRepository.update).toHaveBeenCalledWith(updatedOrder);

        });

        it('should throw an error if order is not found', async () => {
            jest.spyOn(orderRepository, 'findOrderById').mockResolvedValue(null);

            await expect(service.update({ id: '1', orderCode: null, status: StatusEnum.IN_PROGRESS, clientId: null, paymentId: null })).rejects.toThrow(NotFoundException);
            expect(orderRepository.findOrderById).toHaveBeenCalledWith('1');
        })

    });


})