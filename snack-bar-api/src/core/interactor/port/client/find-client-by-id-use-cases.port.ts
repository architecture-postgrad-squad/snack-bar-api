import { Client } from '@/core/domain/client/client.entity';

export abstract class FindClientByIdUseCasesPort {
  abstract execute(id: string): Promise<Client | null>;
}
