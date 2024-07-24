import { Client } from '@/core/domain/client/client.entity';
import { FindClientByCpfUseCases } from '@/core/interactor/usecases/client/find-client-by-cpf.use-cases';
import { IClientRepository } from '@/core/repository/client/client.repository';

describe('FindClientByCpfUseCases', () => {
    let useCase: FindClientByCpfUseCases;
    let clientRepository: IClientRepository;

    beforeEach(async () => {
        clientRepository = {
            findById: jest.fn(),
            findByCpf: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };

        useCase = new FindClientByCpfUseCases(clientRepository);
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
        (clientRepository.findByCpf as jest.Mock).mockResolvedValue(client);

        expect(await useCase.execute('49744639857')).toBe(client);
        expect(clientRepository.findByCpf).toHaveBeenCalledWith('49744639857');
    });

    it('should throw an error if client is not found', async () => {
        (clientRepository.findByCpf as jest.Mock).mockRejectedValue(
            new Error('Client not found'),
        );

        await expect(useCase.execute('49744639857')).rejects.toThrow(Error);
        expect(clientRepository.findByCpf).toHaveBeenCalledWith('49744639857');
    });

});
