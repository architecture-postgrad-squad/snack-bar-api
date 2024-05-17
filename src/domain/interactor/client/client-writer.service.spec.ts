import { Test, TestingModule } from '@nestjs/testing';
import { PreconditionFailedException } from '@nestjs/common';
import { ClientWriterService } from '@/domain/interactor/client/client-writer.service';
import { ClientRepository } from '@/domain/repository/client/client.repository';
import { Client } from '@/domain/entity/client/client.entity';

describe('ClientWriterService', () => {
  let service: ClientWriterService;
  let clientRepository: Partial<ClientRepository>;

  beforeEach(async () => {
    clientRepository = {
      save: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientWriterService,
        { provide: ClientRepository, useValue: clientRepository },
      ],
    }).compile();

    service = module.get<ClientWriterService>(ClientWriterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save a valid client', async () => {
      const client = new Client('1', 'Gandalf The Grey', 'gandalf.gray@example.com', '123456789');
      client.isValid = jest.fn().mockReturnValue(true);

      (clientRepository.save as jest.Mock).mockResolvedValue(client);

      expect(await service.create(client)).toBe(client);
      expect(clientRepository.save).toHaveBeenCalledWith(client);
    });

    it('should throw PreconditionFailedException for an invalid client', async () => {
      const client = new Client('1', '', '', ''); 
      client.isValid = jest.fn().mockReturnValue(false);

      await expect(service.create(client)).rejects.toThrow(PreconditionFailedException);
    });
  });

  describe('update', () => {
    it('should update an existing client', async () => {
      const existingClient = new Client('1', 'Gandalf The Grey', 'gandalf.gray@example.com', '123456789');
      const updatedClient = new Client('1', 'Radagast The Brown', 'radagast.brown@example.com', '987654321');
      updatedClient.isValid = jest.fn().mockReturnValue(true);

      (clientRepository.findById as jest.Mock).mockResolvedValue(existingClient);
      (clientRepository.save as jest.Mock).mockResolvedValue(updatedClient);

      expect(await service.update(updatedClient)).toBe(updatedClient);
      expect(clientRepository.findById).toHaveBeenCalledWith('1');
      expect(clientRepository.save).toHaveBeenCalledWith(updatedClient);
    });

    it('should throw PreconditionFailedException for an invalid updated client', async () => {
      const existingClient = new Client('1', 'Gandalf The Grey', 'gandalf.gray@example.com', '123456789');
      const updatedClient = new Client('1', '', '', '');
      updatedClient.isValid = jest.fn().mockReturnValue(false);

      (clientRepository.findById as jest.Mock).mockResolvedValue(existingClient);

      await expect(service.update(updatedClient)).rejects.toThrow(PreconditionFailedException);
    });

    it('should throw an error if the client does not exist', async () => {
      const client = new Client('1', 'Gandalf The Grey', 'gandalf.gray@example.com', '123456789');
      client.isValid = jest.fn().mockReturnValue(true);

      (clientRepository.findById as jest.Mock).mockRejectedValue(new Error('Client not found'));

      await expect(service.update(client)).rejects.toThrow(Error);
    });
  });
});
