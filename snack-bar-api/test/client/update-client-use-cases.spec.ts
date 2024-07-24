import { BadRequestException } from '@/core/exceptions/custom-exceptions/bad-request.exception';
import { UpdateClientUseCases } from '@/core/interactor/usecases/client/update-client.use-cases';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { toDomain as updateToDomain } from '@/transport/dto/client/update-client.dto';

describe('UpdateClientUseCases', () => {
  let useCase: UpdateClientUseCases;
  let clientRepository: IClientRepository;

  beforeEach(async () => {
    clientRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findByCpf: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new UpdateClientUseCases(clientRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update an existing client', async () => {
    const existingClient = {
      id: '1',
      name: 'Gandalf The Grey',
      email: 'gandalf.gray@example.com',
      cpf: '123456789',
    };
    const updatedClient = {
      id: '1',
      name: 'Radagast The Brown',
      email: 'radagast.brown@example.com',
      cpf: '987654321',
    };

    (clientRepository.findById as jest.Mock).mockResolvedValue(existingClient);
    (clientRepository.update as jest.Mock).mockResolvedValue(updatedClient);

    expect(await useCase.execute(updateToDomain(updatedClient, updatedClient.id))).toBe(
      updatedClient,
    );
    expect(clientRepository.findById).toHaveBeenCalledWith('1');
    expect(clientRepository.update).toHaveBeenCalledWith(updatedClient);
  });

  it('should throw BadRequestException for an invalid updated client', async () => {
    const existingClient = updateToDomain(
      {
        name: 'Gandalf The Grey',
        email: 'gandalf.gray@example.com',
        cpf: '123456789',
      },
      '1',
    );

    const updatedClient = updateToDomain(
      {
        name: '',
        email: '',
        cpf: '',
      },
      '1',
    );

    jest.spyOn(clientRepository, 'findById').mockResolvedValue(existingClient);

    await expect(useCase.execute(updatedClient)).rejects.toThrow(BadRequestException);
  });

  it('should throw an error if the client does not exist', async () => {
    const client = updateToDomain(
      {
        name: 'Gandalf The Grey',
        email: 'gandalf.gray@example.com',
        cpf: '123456789',
      },
      '1',
    );

    (clientRepository.findById as jest.Mock).mockRejectedValue(
      new Error('Client not found'),
    );

    await expect(useCase.execute(client)).rejects.toThrow(Error);
  });
});
