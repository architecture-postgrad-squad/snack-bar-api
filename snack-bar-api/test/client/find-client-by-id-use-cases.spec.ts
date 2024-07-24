import { Client } from '@/core/domain/client/client.entity';
import { FindClientByIdUseCases } from '@/core/interactor/usecases/client/find-client-by-id.use-cases';
import { IClientRepository } from '@/core/repository/client/client.repository';

describe('FindClientByIdUseCases', () => {
    let useCase: FindClientByIdUseCases;
    let clientRepository: IClientRepository;

    beforeEach(async () => {
        clientRepository = {
            findById: jest.fn(),
            findByCpf: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };

        useCase = new FindClientByIdUseCases(clientRepository);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should return a client if found', async () => {
        const client = new Client(
            '1',
            'Gandalf The Grey',
            'gandalf.grey@example.com',
            '49744639857',
        );
        (clientRepository.findById as jest.Mock).mockResolvedValue(client);

        expect(await useCase.execute('1')).toBe(client);
        expect(clientRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if client is not found', async () => {
        (clientRepository.findById as jest.Mock).mockRejectedValue(
            new Error('Client not found'),
        );

        await expect(useCase.execute('1')).rejects.toThrow(Error);
        expect(clientRepository.findById).toHaveBeenCalledWith('1');
    });

});
