import { ClientPostgreAdapter } from '@/datasource/adapter/client/client-postgre.adapter';
import { ClientReaderService } from '@/domain/interactor/client/client-reader.service';
import { ClientWriterService } from '@/domain/interactor/client/client-writer.service';
import { ClientReaderServicePort } from '@/domain/interactor/port/client/client-reader-service.port';
import { ClientWriterServicePort } from '@/domain/interactor/port/client/client-writer-service.port';
import { IClientRepository } from '@/domain/repository/client/client.repository';
import { ClientController } from '@/transport/controller/client/client.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.config';

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
      useClass: ClientPostgreAdapter,
    },
  ],
})
export class ClientModule {}
