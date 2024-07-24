import { Client } from '@/core/domain/client/client.entity';

export abstract class FindAllClientsUseCasesPort {
  abstract execute(): Promise<Client[]>;
}
