import { Payment } from '@/domain/entity/payment/payment.entity';
import { PaymentService } from '@/domain/interactor/payment/payment.service';
import { PaymentRepository } from '@/domain/repository/payment/payment.repository';
import { CreatePaymentDto } from '@/transport/dto/payment.dto';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: PaymentRepository;

  beforeEach(async () => {
    const mockPaymentRepository = {
      create: jest.fn((payment) =>
        Promise.resolve({ ...payment, id: 'some-id', createdAt: new Date() }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PaymentRepository,
          useValue: mockPaymentRepository,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<PaymentRepository>(PaymentRepository);
  });

  it('should create a payment and return it', async () => {
    const paymentDto: CreatePaymentDto = {
      value: 100,
      method: 'Credit Card',
    };

    const expectedPayment: Payment = {
      ...paymentDto,
      id: 'some-id',
      createdAt: expect.any(Date),
    };

    jest.spyOn(paymentRepository, 'create').mockResolvedValue(expectedPayment);
    const result = await service.create(paymentDto);
    expect(result).toEqual(expectedPayment);
    expect(paymentRepository.create).toHaveBeenCalledWith(paymentDto);
  });

  it('should handle errors when creating a payment', async () => {
    const paymentDto: CreatePaymentDto = {
      value: 100,
      method: 'Credit Card',
    };

    jest
      .spyOn(paymentRepository, 'create')
      .mockRejectedValue(new Error('Failed to create payment'));
    await expect(service.create(paymentDto)).rejects.toThrow(HttpException);
  });
});
