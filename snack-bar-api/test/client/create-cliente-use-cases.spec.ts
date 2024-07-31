import { BadRequestException } from '@/core/exceptions/custom-exceptions/bad-request.exception';
import { CreateClientUseCases } from '@/core/interactor/usecases/client/create-client.use-cases';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { toDomain } from '@/transport/dto/client/create-client.dto';
import { toDomain as updateToDomain } from '@/transport/dto/client/update-client.dto';

describe('CreateClientUseCases', () => {
  let useCase: CreateClientUseCases;
  let clientRepository: IClientRepository;

  beforeEach(async () => {
    clientRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findByCpf: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new CreateClientUseCases(clientRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should save a valid client', async () => {
    const client = {
      name: 'Gandalf The Grey',
      email: 'gandalf.gray@example.com',
      cpf: '12345678910',
    };

    const expectedClient = {
      id: '1',
      ...client,
    };
    jest
      .spyOn(clientRepository, 'create')
      .mockResolvedValue(updateToDomain(expectedClient, expectedClient.id));
    const createdClient = await useCase.execute(toDomain(client));
    expect(createdClient.id).toBe('1');
    expect(clientRepository.create).toHaveBeenCalledWith(toDomain(client));
  });

  it('should throw BadRequestException for an invalid client', async () => {
    const client = {
      id: '1',
      name: '',
      email: '',
      cpf: '',
    };

    await expect(useCase.execute(toDomain(client))).rejects.toThrow(BadRequestException);
  });
});
