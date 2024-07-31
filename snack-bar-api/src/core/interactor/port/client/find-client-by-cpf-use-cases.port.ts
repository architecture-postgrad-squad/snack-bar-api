import { Client } from '@/core/domain/client/client.entity';

export abstract class FindClientByCpfUseCasesPort {
  abstract execute(cpf: string): Promise<Client | null>;
}
