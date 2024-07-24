import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma.config';
import { CreateClientUseCasesPort } from '@/core/interactor/port/client/create-client-use-cases.port';
import { FindAllClientsUseCasesPort } from '@/core/interactor/port/client/find-all-clients-use-cases.port';
import { FindClientByCpfUseCasesPort } from '@/core/interactor/port/client/find-client-by-cpf-use-cases.port';
import { FindClientByIdUseCasesPort } from '@/core/interactor/port/client/find-client-by-id-use-cases.port';
import { UpdateClientUseCasesPort } from '@/core/interactor/port/client/update-client-use-cases.port';
import { CreateClientUseCases } from '@/core/interactor/usecases/client/create-client.use-cases';
import { FindAllClientsUseCases } from '@/core/interactor/usecases/client/find-all-clients.use-cases';
import { FindClientByCpfUseCases } from '@/core/interactor/usecases/client/find-client-by-cpf.use-cases';
import { FindClientByIdUseCases } from '@/core/interactor/usecases/client/find-client-by-id.use-cases';
import { UpdateClientUseCases } from '@/core/interactor/usecases/client/update-client.use-cases';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { ClientPostgresAdapter } from '@/datasource/adapter/client/client-postgres.adapter';
import { ClientController } from '@/transport/controller/client.controller';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [
    PrismaService,
    {
      provide: CreateClientUseCasesPort,
      useFactory: (clientRepository: IClientRepository) => {
        return new CreateClientUseCases(clientRepository);
      },
      inject: [IClientRepository],
    },
    {
      provide: UpdateClientUseCasesPort,
      useFactory: (clientRepository: IClientRepository) => {
        return new UpdateClientUseCases(clientRepository);
      },
      inject: [IClientRepository],
    },
    {
      provide: FindAllClientsUseCasesPort,
      useFactory: (clientRepository: IClientRepository) => {
        return new FindAllClientsUseCases(clientRepository);
      },
      inject: [IClientRepository],
    },
    {
      provide: FindClientByCpfUseCasesPort,
      useFactory: (clientRepository: IClientRepository) => {
        return new FindClientByCpfUseCases(clientRepository);
      },
      inject: [IClientRepository],
    },
    {
      provide: FindClientByIdUseCasesPort,
      useFactory: (clientRepository: IClientRepository) => {
        return new FindClientByIdUseCases(clientRepository);
      },
      inject: [IClientRepository],
    },
    {
      provide: IClientRepository,
      useClass: ClientPostgresAdapter,
    },
  ],
})
export class ClientModule {}
