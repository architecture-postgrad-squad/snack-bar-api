import { NotFoundException } from "@/config/exceptions/custom-exceptions/not-found.exception";
import { StatusEnum } from "@/core/domain/order/status.entity";
import { CategoryEnum } from "@/core/enum/product/category.enum";
import { OrderReaderService } from "@/core/interactor/services/order/order-reader.service";
import { IOrderRepository } from "@/core/repository/order/order.respository";


describe('OrderReaderService', () => {
    let service: OrderReaderService;
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
            }
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
        }
    }


    beforeEach(() => {
        orderRepository = {
            create: jest.fn(),
            update: jest.fn(),
            findOrderById: jest.fn(),
            findOrderProductById: jest.fn(),
            findAllOrderPrduct: jest.fn(),
        };

        service = new OrderReaderService(orderRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findById', () => {
        it('should return an order if found', async () => {

            jest.spyOn(orderRepository, 'findOrderProductById').mockResolvedValue(expectedOrder);

            expect(await service.findById('1')).toBe(expectedOrder);
            expect(orderRepository.findOrderProductById).toHaveBeenCalledWith('1');
        })

        it('should throw an error if order is not found', async () => {
            jest.spyOn(orderRepository, 'findOrderProductById').mockResolvedValue(null);

            await expect(service.findById('1')).rejects.toThrow(NotFoundException);
            expect(orderRepository.findOrderProductById).toHaveBeenCalledWith('1');
        })
    })

    describe('findAll', () => {
        it('should return orders if found', async () => {
            jest.spyOn(orderRepository, 'findAllOrderPrduct').mockResolvedValue([expectedOrder]);

            expect(await service.findAll()).toHaveLength(1);
            expect(orderRepository.findAllOrderPrduct).toHaveBeenCalledWith();
        })

        it('should return an empty array if no order was found', async () => {
            jest.spyOn(orderRepository, 'findAllOrderPrduct').mockResolvedValue([]);

            expect(await service.findAll()).toHaveLength(0); 
            expect(orderRepository.findAllOrderPrduct).toHaveBeenCalledWith();
        })
    })
})