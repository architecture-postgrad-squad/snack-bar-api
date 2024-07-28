import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { PaymentReaderService } from '@/core/interactor/services/payment/payment-reader.service';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { randomUUID } from 'crypto';

describe('PaymentReaderService', () => {
  let paymentRepository: IPaymentRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    updateById: jest.fn(),
  };
  let service: PaymentReaderService = new PaymentReaderService(paymentRepository);

  const paymentMock = {
    id: '1',
    value: 100,
    method: 'Credit Card',
    createdAt: new Date(),
  };

  describe('findById', () => {
    it('should return payment status', async () => {
      jest.spyOn(paymentRepository, 'findById').mockResolvedValue(paymentMock);

      expect(await service.findById('1')).toBe(paymentMock);
      expect(paymentRepository.findById).toHaveBeenCalled();
    });

    it('should throw an error if payment is not registered in database', async () => {
      jest.spyOn(paymentRepository, 'findById').mockRejectedValueOnce(new Error());

      try {
        return await service.findById(randomUUID());
      } catch (error) {
        expect(error).toEqual(
          new NotFoundException({ description: 'Payment not found' }),
        );
      }
    });
  });
});
