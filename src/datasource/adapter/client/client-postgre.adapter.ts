import { PrismaService } from "@/config/prisma.config";
import { Client } from "@/domain/entity/client/client.entity";
import { ClientRepository } from "@/domain/repository/client/client.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClientPostgreAdapter implements ClientRepository {
    constructor(private readonly prisma: PrismaService) {}
    
    save(client: Client): Promise<Client> {
        return this.prisma.client.upsert({
            where: {
              id: client.id,
            },
            update: {
              ...client,
            },
            create: {
              ...client,
            },
        });
    }

    getById(id: string): Promise<Client> {
        return this.prisma.client.findUnique({
            where: {
              id: id,
            },
        });
    }

    getAll(): Promise<Client[]> {
        return this.prisma.client.findMany()
    }

}