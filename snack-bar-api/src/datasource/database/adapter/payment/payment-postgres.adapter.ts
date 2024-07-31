import { PrismaService } from '@/config/prisma.config';
import { Payment } from '@/core/domain/payment/payment.entity';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentPostgresAdapter implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payment: Payment): Promise<Payment> {
    return (await this.prisma.payment.create({
      data: {
        method: payment.method,
        value: payment.value,
        status: payment.status,
      },
    })) as Payment;
  }

  async findById(id: string): Promise<Payment> {
    return (await this.prisma.payment.findUniqueOrThrow({
      where: {
        id,
      },
    })) as Payment;
  }

  async updateById(id: string, payment: Payment): Promise<Payment> {
    return (await this.prisma.payment.update({
      where: {
        id,
      },
      data: {
        value: payment.value,
        status: payment.status,
        externalId: payment.externalId,
        method: payment.method,
      },
    })) as Payment;
  }
}
