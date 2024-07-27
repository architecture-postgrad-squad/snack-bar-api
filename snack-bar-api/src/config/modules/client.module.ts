import { ClientReaderServicePort } from '@/core/interactor/port/client/client-reader-service.port';
import { ClientWriterServicePort } from '@/core/interactor/port/client/client-writer-service.port';
import { ClientReaderService } from '@/core/interactor/services/client/client-reader.service';
import { ClientWriterService } from '@/core/interactor/services/client/client-writer.service';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { ClientPostgresAdapter } from '@/datasource/database/adapter/client/client-postgres.adapter';
import { ClientController } from '@/transport/controller/client.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.config';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [
    PrismaService,
    {
      provide: ClientWriterServicePort,
      useFactory: (clientRepository: IClientRepository) => {
        return new ClientWriterService(clientRepository);
      },
      inject: [IClientRepository],
    },
    {
      provide: ClientReaderServicePort,
      useFactory: (clientRepository: IClientRepository) => {
        return new ClientReaderService(clientRepository);
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
