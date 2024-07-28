import { Payment } from '@/core/domain/payment/payment.entity';
import { UpdatePaymentUseCaseService } from '@/core/interactor/services/payment/update-usecase.service';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { MercadoPagoServicePort } from '@/datasource/mercado-pago/port/mercado-pago-service.port';

describe('UpdatePaymentUseCaseService', () => {
  let service: UpdatePaymentUseCaseService;
  let paymentRepository: IPaymentRepository;
  let mercadoPagoAdapterService: MercadoPagoServicePort;

  beforeEach(async () => {
    paymentRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
    };

    mercadoPagoAdapterService = {
      getPaymentById: jest.fn(),
    };

    service = new UpdatePaymentUseCaseService(
      paymentRepository,
      mercadoPagoAdapterService,
    );
  });

  it('should fetch payment data from mercado pago API and update database register', async () => {
    const payment: Payment = {
      id: '122',
      value: 100,
      method: 'PIX',
      createdAt: new Date(),
    };

    const adapterSpy = jest
      .spyOn(mercadoPagoAdapterService, 'getPaymentById')
      .mockResolvedValue(payment);
    const repositorySpy = jest.spyOn(paymentRepository, 'updateById');

    const result = await service.execute('122');

    expect(result).toMatchObject({
      message: 'Payment register was updated successfully',
    });
    expect(repositorySpy).toHaveBeenCalled();
    expect(adapterSpy).toHaveBeenCalledWith('122');
  });

  it('should handle errors when mercado pago API is not responsive', async () => {
    jest
      .spyOn(mercadoPagoAdapterService, 'getPaymentById')
      .mockRejectedValueOnce(new Error('Third party API is out of service'));

    try {
      return await service.execute('122');
    } catch (error) {
      expect(error).toEqual(new Error('Third party API is out of service'));
    }
  });
});
