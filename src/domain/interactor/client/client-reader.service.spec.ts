import { Test, TestingModule } from '@nestjs/testing';
import { ClientReaderService } from './client-reader.service';
import { ClientRepository } from '@/domain/repository/client/client.repository';
import { Client } from '@/domain/entity/client/client.entity';

describe('ClientReaderService', () => {
  let service: ClientReaderService;
  let clientRepository: Partial<ClientRepository>;

  beforeEach(async () => {
    clientRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientReaderService,
        { provide: ClientRepository, useValue: clientRepository },
      ],
    }).compile();

    service = module.get<ClientReaderService>(ClientReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a client if found', async () => {
      const client = new Client('1', 'Gandalf The Grey', 'gandalf.grey@example.com', '123456789');
      (clientRepository.findById as jest.Mock).mockResolvedValue(client);

      expect(await service.findById('1')).toBe(client);
      expect(clientRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if client is not found', async () => {
      (clientRepository.findById as jest.Mock).mockRejectedValue(new Error('Client not found'));

      await expect(service.findById('1')).rejects.toThrow(Error);
      expect(clientRepository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const clients = [
        new Client('1', 'Gandalf The Grey', 'gandalf.grey@example.com', '123456789'),
        new Client('2', 'Radagast The Brown', 'radagast.brown@example.com', '987654321'),
      ];
      (clientRepository.findAll as jest.Mock).mockResolvedValue(clients);

      expect(await service.findAll()).toBe(clients);
      expect(clientRepository.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no clients are found', async () => {
      (clientRepository.findAll as jest.Mock).mockResolvedValue([]);

      expect(await service.findAll()).toEqual([]);
      expect(clientRepository.findAll).toHaveBeenCalled();
    });
  });
});
