import { PrismaService } from '@/config/prisma.config';
import { Client } from '@/core/domain/client/client.entity';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientPostgresAdapter implements IClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(client: Client): Promise<Client> {
    return this.prisma.client.create({
      data: {
        ...client,
      },
    }).then((client) => (this.toDomain(client)));
  }

  update(client: Client): Promise<Client> {
    return this.prisma.client.update({
      where: { id: client.id },
      data: {
        ...client,
      },
    }).then((client) => (this.toDomain(client)));
  }

  findById(id: string): Promise<Client> {
    return this.prisma.client.findUnique({
      where: {
        id: id,
      },
    }).then((client) => (this.toDomain(client)));
  }

  findByCpf(cpf: string): Promise<Client> {
    return this.prisma.client.findUniqueOrThrow({
      where: {
        cpf: cpf,
      },
    }).then((client) => (this.toDomain(client)));
  }

  findAll(): Promise<Client[]> {
    return this.prisma.client.findMany().then((clients) => (clients.map((client) => (this.toDomain(client)))));
  }

  private toDomain(client): Client {
    return new Client(client.id, client.name, client.email, client.cpf)
  }
}
