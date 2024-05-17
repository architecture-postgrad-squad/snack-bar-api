import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, PreconditionFailedException } from '@nestjs/common';
import { ClientService } from './client/client.service';
import { ClientRepository } from '../repository/client/client.repository';
import { Client } from '../entity/client/client.entity';

describe('ClientService', () => {
  let service: ClientService;
  let repository: ClientRepository;

  const clientRepositoryMock = {
    getById: jest.fn<Promise<Client | null>, [string]>(),
    getAll: jest.fn<Promise<Client[]>, []>(),
    save: jest.fn<Promise<Client>, [Client]>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: ClientRepository,
          useValue: clientRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<ClientRepository>(ClientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a client by id', async () => {
      const client: Client = { id: '1', name: 'John Doe', email: 'john@example.com', cpf: '12345678900' };
      clientRepositoryMock.getById.mockResolvedValue(client);

      expect(await service.findById('1')).toBe(client);
      expect(clientRepositoryMock.getById).toHaveBeenCalledWith('1');
    });

    it('should return null if client not found', async () => {
      clientRepositoryMock.getById.mockResolvedValue(null);

      expect(await service.findById('1')).toBeNull();
      expect(clientRepositoryMock.getById).toHaveBeenCalledWith('1');
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const clients: Client[] = [{ id: '1', name: 'John Doe', email: 'john@example.com', cpf: '12345678900' }];
      clientRepositoryMock.getAll.mockResolvedValue(clients);

      expect(await service.findAll()).toBe(clients);
      expect(clientRepositoryMock.getAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a new client', async () => {
      const client: Client = { id: '1', name: 'John Doe', email: 'john@example.com', cpf: '12345678900' };
      clientRepositoryMock.save.mockResolvedValue(client);

      expect(await service.create(client)).toBe(client);
      expect(clientRepositoryMock.save).toHaveBeenCalledWith(client);
    });

    it('should throw PreconditionFailedException if client is invalid', async () => {
      const invalidClient: Client = { id: '1', name: '', email: '', cpf: '' };

      await expect(service.create(invalidClient)).rejects.toThrow(PreconditionFailedException);
    });
  });

  describe('update', () => {
    it('should update and return an existing client', async () => {
      const existingClient: Client = { id: '1', name: 'John Doe', email: 'john@example.com', cpf: '12345678900' };
      const updatedClient: Client = { id: '1', name: 'Jane Doe', email: 'jane@example.com', cpf: '12345678900' };
      clientRepositoryMock.getById.mockResolvedValue(existingClient);
      clientRepositoryMock.save.mockResolvedValue(updatedClient);

      expect(await service.update(updatedClient)).toBe(updatedClient);
      expect(clientRepositoryMock.getById).toHaveBeenCalledWith('1');
      expect(clientRepositoryMock.save).toHaveBeenCalledWith(updatedClient);
    });

    it('should throw ForbiddenException if client does not exist', async () => {
      const updatedClient: Client = { id: '1', name: 'Jane Doe', email: 'jane@example.com', cpf: '12345678900' };
      clientRepositoryMock.getById.mockResolvedValue(null);

      await expect(service.update(updatedClient)).rejects.toThrow(ForbiddenException);
    });

    it('should throw PreconditionFailedException if updated client is invalid', async () => {
      const existingClient: Client = { id: '1', name: 'John Doe', email: 'john@example.com', cpf: '12345678900' };
      const invalidClient: Client = { id: '1', name: '', email: '', cpf: '' };
      clientRepositoryMock.getById.mockResolvedValue(existingClient);

      await expect(service.update(invalidClient)).rejects.toThrow(PreconditionFailedException);
    });
  });
});
