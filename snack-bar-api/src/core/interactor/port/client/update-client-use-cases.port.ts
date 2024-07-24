import { Client } from '@/core/domain/client/client.entity';

export abstract class UpdateClientUseCasesPort {
  abstract execute(client: Client): Promise<Client>;
}
