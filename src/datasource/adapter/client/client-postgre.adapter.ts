import { PrismaService } from '@/config/prisma.config';
import { Client } from '@/domain/entity/client/client.entity';
import { IClientRepository } from '@/domain/repository/client/client.repository';
import { CreateClientDTO } from '@/transport/dto/Client/create-client.dto';
import { UpdateClientDTO } from '@/transport/dto/Client/update-client.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientPostgreAdapter implements IClientRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(client: CreateClientDTO): Promise<Client> {
    return this.prisma.client.create({
      data: {
        ...client,
      },

    });
  }

  update(client: UpdateClientDTO): Promise<Client> {
    return this.prisma.client.update({
      where: { id: client.id },
      data: {
        ...client,
      },
    });
  }

  findById(id: string): Promise<Client> {
    return this.prisma.client.findUnique({
      where: {
        id: id,
      },
    });
  }

  findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }
}
