import { Payment } from '@/domain/entity/payment/payment.entity';
import { PaymentWriterService } from '@/domain/interactor/payment/payment-writer.service';
import { IPaymentRepository } from '@/domain/repository/payment/payment.repository';
import { CreatePaymentDto } from '@/transport/dto/payment/request/payment.dto';
import { HttpException } from '@nestjs/common';

describe('PaymentService', () => {
  let service: PaymentWriterService;
  let paymentRepository: IPaymentRepository;

  beforeEach(async () => {
    paymentRepository = {
      create: jest.fn((payment) =>
        Promise.resolve({ ...payment, id: 'some-id', createdAt: new Date() }),
      ),
    };

    service = new PaymentWriterService(paymentRepository);
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
