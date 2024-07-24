import { Client } from '@/core/domain/client/client.entity';

export abstract class CreateClientUseCasesPort {
  abstract execute(client: Client): Promise<Client>;
}
