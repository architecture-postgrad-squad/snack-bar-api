import { BadRequestException } from '@/config/exceptions/custom-exceptions/bad-request.exception';
import { ClientWriterService } from '@/core/interactor/services/client/client-writer.service';
import { IClientRepository } from '@/core/repository/client/client.repository';

describe('ClientWriterService', () => {
  let service: ClientWriterService;
  let clientRepository: IClientRepository;

  beforeEach(async () => {
    clientRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findByCpf: jest.fn(),
      findAll: jest.fn(),
    };

    service = new ClientWriterService(clientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
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
      jest.spyOn(clientRepository, 'create').mockResolvedValue(expectedClient);
      const createdClient = await service.create(client);
      expect(createdClient).toBe(expectedClient);
      expect(clientRepository.create).toHaveBeenCalledWith(client);
    });

    it('should throw BadRequestException for an invalid client', async () => {
      const client = {
        id: '1',
        name: '',
        email: '',
        cpf: '',
      };

      await expect(service.create(client)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
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

      expect(await service.update(updatedClient)).toBe(updatedClient);
      expect(clientRepository.findById).toHaveBeenCalledWith('1');
      expect(clientRepository.update).toHaveBeenCalledWith(updatedClient);
    });

    it('should throw BadRequestException for an invalid updated client', async () => {
      const existingClient = {
        id: '1',
        name: 'Gandalf The Grey',
        email: 'gandalf.gray@example.com',
        cpf: '123456789',
      };

      const updatedClient = {
        id: '1',
        name: '',
        email: '',
        cpf: '',
      };

      jest.spyOn(clientRepository, 'findById').mockResolvedValue(existingClient);

      await expect(service.update(updatedClient)).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if the client does not exist', async () => {
      const client = {
        id: '1',
        name: 'Gandalf The Grey',
        email: 'gandalf.gray@example.com',
        cpf: '123456789',
      };

      (clientRepository.findById as jest.Mock).mockRejectedValue(
        new Error('Client not found'),
      );

      await expect(service.update(client)).rejects.toThrow(Error);
    });
  });
});
